import React, { useEffect, useMemo, useRef } from 'react';

import THREE, { Fiber } from '@/Three';

// Context
import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';

// Anchors
import { anchorCount, getAnchor, reach, spread } from './anchors';

// Constants
import { GLOBE_MARGIN, TRUNK_SIZE } from './constants';

// Zoom
import { setZoom } from './zoom';

/**
 * Frames the taxon the route is on, and choreographs the pull-back from it.
 *
 * There is one control here: how far out you are, from 0 at the taxon to 1 at
 * the whole lineage. Everything — where the camera looks, how far back it
 * stands, which way is up — is a pure function of that number, interpolated
 * between two fully specified poses. Nothing eases toward anything else, and
 * there is no second piece of state that can disagree with it.
 *
 * That is why the camera is driven directly rather than through an orbit
 * controller. A controller owns position and target and damps them on its own
 * schedule, so a composition layered over the top can only run once it has
 * settled — which reads as a dolly followed by a separate lurch, however it is
 * tuned. Deriving the whole pose from a single parameter makes the move
 * continuous by construction: every intermediate value is a valid picture.
 */

/** How long to keep waiting for a tree that never finishes, in seconds. */
const GRACE = 1.5;

/** Frames the anchor count has to hold steady before the camera commits. */
const STABLE_FRAMES = 2;

/** Framing radius when the ancestor never anchors, as a fraction of extent. */
const FALLBACK_REACH = 0.05;

/** Breathing room around the framed pair. */
const PADDING = 1.6;
/** Never end up inside the geometry when the ancestor sits very close. */
const MIN_RADIUS = 4;

/**
 * How far off the lineage axis the camera sits at the near end, in radians.
 * Looking straight down the branch flattens the clade into a rosette; a
 * three-quarter view restores the depth.
 */
const TILT = Math.PI / 4.5;

/** Breathing room left around the tree at the furthest zoom, in `rem`. */
const VIEW_MARGIN_REM = 4;

/** Clearance kept beyond the furthest thing in the scene, and the near:far cap. */
const FRUSTUM_MARGIN = 1.25;
const DEPTH_RATIO = 20000;

/** The up-vector at the near end of the zoom. */
const WORLD_UP = new THREE.Vector3(0, 1, 0);

/**
 * How much of the range one wheel notch covers, and how fast the camera catches
 * up to where the wheel has put it.
 *
 * The damping is on the *parameter*, not on the camera. One number is smoothed
 * and the entire pose is read off it, so the motion cannot come apart into
 * separate dolly and rotation phases the way it does when each is eased on its
 * own clock.
 *
 * A notch of wheel is `deltaY: 100`, so the sensitivity is set for roughly
 * thirty of them across the whole sweep. It wants to be low: the range covers
 * a complete change of subject, from one taxon to its entire ancestry, and at
 * anything brisker a single flick of the wheel crosses the lot and the
 * choreography has no room to read.
 */
const WHEEL_SENSITIVITY = 0.00035;
const ZOOM_EASE = 7;

/** Radians of orbit per pixel dragged. */
const DRAG_SENSITIVITY = 0.005;

/**
 * How close the camera may get to either pole of the pose's own up-vector.
 *
 * Looking straight along `up` leaves `lookAt` with no way to decide which way
 * round the horizon goes, so the view rolls over. Stopping short of it also
 * keeps the lineage readable — end-on, a chain of taxa collapses into a dot.
 */
const TILT_LIMIT = 0.25;

/**
 * How far the composition is rolled at full pull-back, in radians.
 *
 * Upright, the lineage runs straight down the middle and leaves the corners
 * doing nothing. On the diagonal it uses the frame it is given — the taxon
 * top-left, the origin of life bottom-right — and a viewport is wider than it
 * is tall, so the axis gets more room across the diagonal than it ever had
 * vertically.
 */
const ROLL = -Math.PI / 4;

/**
 * How far the far bearing leans toward the origin end of the lineage.
 *
 * Square-on to the axis, the camera is equidistant from both ends and the
 * origin of life sits buried at the centre of its own tree, with every clade
 * that grew out of it in the way. Leaning brings it forward — nearest the lens,
 * read first — at the cost of a little foreshortening along the axis, which
 * `cos` keeps small at this angle.
 */
const LEAN = Math.PI / 7;

/**
 * How far back the camera has to stand for a sphere of `radius` to sit inside
 * the viewport with `marginPx` to spare on every side.
 *
 * The margin is taken off the viewport in pixels and converted back into an
 * angle, rather than padding the radius: a fixed world-space pad would shrink
 * on screen as the tree grows, and the point of the margin is that the outer
 * taxa stay clear of the edge by a constant amount however deep the lineage.
 */
function distanceToFit(
  radius: number,
  camera: THREE.PerspectiveCamera,
  size: { width: number; height: number },
  marginPx: number
): number {
  const verticalFov = (camera.fov * Math.PI) / 180;
  const horizontalFov =
    2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);

  const halfHeight = size.height / 2;
  const halfWidth = size.width / 2;

  // Never let the margin eat the whole viewport on a very small window.
  const usableHeight = Math.max(halfHeight - marginPx, halfHeight * 0.2);
  const usableWidth = Math.max(halfWidth - marginPx, halfWidth * 0.2);

  const angleV = Math.atan(
    Math.tan(verticalFov / 2) * (usableHeight / halfHeight)
  );
  const angleH = Math.atan(
    Math.tan(horizontalFov / 2) * (usableWidth / halfWidth)
  );

  // Whichever axis is tighter decides — the sphere has to clear both.
  return Math.max(radius / Math.tan(angleV), radius / Math.tan(angleH));
}

/**
 * Keep the view frustum around the scene.
 *
 * The tree's extent is emergent — a deep lineage runs several times further out
 * than a shallow one — so no fixed `far` can be right for all of them. The
 * default 1000 was comfortable when the tree reached 115 units; past that,
 * pulling back pushes the far plane through the globe, which reads as the
 * sphere cropping to a cap with a black disc where its far half was clipped,
 * and then as everything vanishing at once.
 */
function fitFrustum(camera: THREE.PerspectiveCamera): void {
  const extent = Math.max(reach() * GLOBE_MARGIN, MIN_RADIUS);
  const far = (camera.position.length() + extent) * FRUSTUM_MARGIN;

  if (Math.abs(far - camera.far) / camera.far < 0.01) {
    return;
  }

  camera.far = far;
  camera.near = Math.max(0.1, far / DEPTH_RATIO);
  camera.updateProjectionMatrix();
}

/** A complete camera pose: what it looks at, from which side, and which way is up. */
type Pose = {
  target: THREE.Vector3;
  /** Unit vector from the target toward the camera. */
  bearing: THREE.Vector3;
  distance: number;
};

type Props = {
  /** The taxon to centre on. */
  nodeId?: string;
  /** Its ancestor, which sets how far back to stand. */
  ancestorId?: string;
  /** How far right of centre the taxon should sit, in CSS pixels. */
  offsetPx?: number;
};

const CameraRig: React.FunctionComponent<Props> = ({
  nodeId,
  ancestorId,
  offsetPx = 0,
}) => {
  const { chains } = useTreeOfLifeContext();
  const camera = Fiber.useThree((state) => state.camera);
  const size = Fiber.useThree((state) => state.size);
  const canvas = Fiber.useThree((state) => state.gl.domElement);

  const framed = useRef<string | null>(null);
  /** When the focus first appeared, so the grace below has something to run from. */
  const waiting = useRef<number | null>(null);
  /** Last frame's anchor count, and how long it has been unchanged. */
  const placed = useRef({ count: -1, held: 0 });

  /** The pose the framing chose — the near end of the pull-back. */
  const near = useRef<Pose>({
    target: new THREE.Vector3(),
    bearing: new THREE.Vector3(0, 0, 1),
    distance: 1,
  });

  /** Where the wheel has put the zoom, and where the camera has caught up to. */
  const wanted = useRef(0);
  const zoom = useRef(0);
  /**
   * Orbit the drag has added: `spin` about the pose's own up-vector, `tilt`
   * about the axis across the view. Held as offsets rather than as a camera
   * position, so they ride on top of the zoom's choreography instead of
   * competing with it — the pose stays a pure function of the zoom, and these
   * are applied to whatever it produces.
   */
  const spin = useRef(0);
  const tilt = useRef(0);
  /**
   * How much of the drag is currently in effect, from 1 at the taxon to 0 at
   * full pull-back. Input is scaled by it too, so a drag that cannot turn the
   * view does not silently bank rotation for when you zoom back in.
   */
  const hand = useRef(1);

  const scratch = useRef(new THREE.Vector3());
  const upright = useRef(new THREE.Vector3());
  const facing = useRef(new THREE.Vector3());
  const lifted = useRef(new THREE.Vector3());
  const centre = useRef(new THREE.Vector3());
  const across = useRef(new THREE.Vector3());

  /*
   * `rem` resolved against the root font size, refreshed whenever the viewport
   * changes. Read here rather than per frame because `getComputedStyle` forces
   * a layout read, and the value only moves when the page does.
   */
  const marginPx = useMemo(
    () =>
      parseFloat(getComputedStyle(document.documentElement).fontSize) *
      VIEW_MARGIN_REM,
    [size.width, size.height]
  );

  /*
   * Input writes to two plain numbers and nothing else. Everything the camera
   * does is derived from them on the next frame, which is what stops the input
   * and the picture from ever disagreeing.
   */
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      wanted.current = Math.min(
        Math.max(wanted.current + event.deltaY * WHEEL_SENSITIVITY, 0),
        1
      );
    };

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) {
        return;
      }

      spin.current += (event.clientX - lastX) * DRAG_SENSITIVITY * hand.current;

      // Dragging down lifts the camera, the way an orbit control reads: the
      // scene tips toward you rather than the camera diving under it.
      tilt.current -= (event.clientY - lastY) * DRAG_SENSITIVITY * hand.current;

      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onUp = () => {
      dragging = false;
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [canvas]);

  /** Compute and store the near pose: the taxon beside the ancestor it grew from. */
  const settle = (
    perspective: THREE.PerspectiveCamera,
    anchor: readonly [number, number, number],
    ancestor: readonly [number, number, number] | null
  ): void => {
    const pose = near.current;

    pose.target.set(...anchor);

    /*
     * The ancestor sets how far back to stand — one level up is the unit that
     * makes a taxon legible next to what it grew from. If it never anchored,
     * fall back to a slice of the tree's own extent rather than giving up.
     */
    const radius = ancestor
      ? Math.max(
          MIN_RADIUS,
          pose.target.distanceTo(scratch.current.set(...ancestor)) * PADDING
        )
      : Math.max(MIN_RADIUS, reach() * FALLBACK_REACH);

    const verticalFov = (perspective.fov * Math.PI) / 180;
    const horizontalFov =
      2 * Math.atan(Math.tan(verticalFov / 2) * perspective.aspect);

    // Fit on whichever axis is tighter, so nothing spills off a narrow viewport.
    pose.distance = Math.max(
      radius / Math.tan(verticalFov / 2),
      radius / Math.tan(horizontalFov / 2)
    );

    /*
     * Stand inward of the taxon. Growth radiates outward from the origin, so a
     * taxon's descendants are always further out than it is — coming from the
     * inside leaves the clade behind it rather than between it and the lens.
     */
    const outward = upright.current.copy(pose.target);

    if (outward.lengthSq() < 1e-6) {
      outward.set(0, 0, 1);
    }

    outward.normalize();

    const helper =
      Math.abs(outward.y) < 0.99
        ? scratch.current.set(0, 1, 0)
        : scratch.current.set(1, 0, 0);
    const side = facing.current.crossVectors(helper, outward).normalize();
    const lift = lifted.current.crossVectors(outward, side).normalize();

    pose.bearing
      .copy(outward)
      .multiplyScalar(-Math.cos(TILT))
      .addScaledVector(lift, Math.sin(TILT) * 0.82)
      .addScaledVector(side, Math.sin(TILT) * 0.57)
      .normalize();

    /*
     * Slide the target left, which puts the taxon right of centre. Only the
     * target moves — the bearing, and with it which side the descendants fall
     * on, is preserved.
     */
    const worldPerPx =
      (2 * pose.distance * Math.tan(verticalFov / 2)) / size.height;

    pose.target.addScaledVector(
      scratch.current
        .crossVectors(facing.current.copy(pose.bearing).negate(), WORLD_UP)
        .normalize(),
      -offsetPx * worldPerPx
    );
  };

  /** Write the camera for the current zoom, blending the near pose into the far one. */
  const compose = (
    perspective: THREE.PerspectiveCamera,
    anchor: readonly [number, number, number]
  ): void => {
    // Smoothstep, so neither end of the range starts or stops abruptly.
    const t = zoom.current;
    const eased = t * t * (3 - 2 * t);
    const pose = near.current;

    /*
     * The far pose is derived, not stored: the lineage stood upright, with the
     * taxon above and the origin every branch grows from below it.
     *
     * That composition is unreachable by turning alone — a rig orbiting a fixed
     * up-vector can put the origin anywhere on a circle around the taxon but
     * never guarantee it lands beneath. The origin→focus axis has to become the
     * screen's up.
     */
    const lineage = centre.current.set(...anchor);
    const height = lineage.length();

    if (height < 1e-3) {
      return;
    }

    const axis = upright.current.copy(lineage).divideScalar(height);

    // Halfway along the lineage, so both ends sit the same distance off centre.
    const farTarget = lineage.multiplyScalar(0.5);

    /*
     * Sized to the taxa, deliberately not to the cage around them. The globe
     * sits `GLOBE_MARGIN` outside the furthest taxon, so enclosing it too means
     * standing about three and a half times further back — measured, 672 units
     * of enclosing radius where the taxa need 190 — which shrinks the lineage to
     * a fifth of the screen and buries the composition the pull-back exists to
     * produce.
     *
     * Measured from the far target rather than from wherever the camera is
     * looking mid-flight: a limit derived from a moving target moves with it.
     */
    const farDistance = distanceToFit(
      spread(farTarget.x, farTarget.y, farTarget.z) + TRUNK_SIZE,
      perspective,
      size,
      marginPx
    );

    /*
     * Take the near bearing round into the axis's own plane. Projecting rather
     * than picking a fixed side keeps the swing short — the camera ends up on
     * whichever side of the lineage it already was.
     */
    const farBearing = facing.current.copy(pose.bearing).projectOnPlane(axis);

    if (farBearing.lengthSq() < 1e-6) {
      farBearing.set(axis.z, axis.x, axis.y).projectOnPlane(axis);
    }

    farBearing.normalize();

    /*
     * Tip the bearing back toward the origin, so the root comes forward out of
     * the tree rather than sitting at the centre of it.
     */
    farBearing
      .multiplyScalar(Math.cos(LEAN))
      .addScaledVector(axis, -Math.sin(LEAN))
      .normalize();

    /*
     * Every field moves on the same parameter, so the pan, the rotation and the
     * dolly are one motion rather than three racing each other.
     */
    const up = lifted.current.copy(WORLD_UP).lerp(axis, eased).normalize();
    const bearing = farBearing.lerpVectors(pose.bearing, farBearing, eased);

    bearing.normalize();

    /*
     * The pull-back takes orientation over as it goes: at the far end the
     * composition is the whole point, so it is authoritative, and on the way
     * back in the view returns to however the drag had left it. Held as a
     * weight rather than by clearing the offsets, so nothing about where the
     * user put the camera is lost by having zoomed out and back.
     */
    const authority = 1 - eased;

    hand.current = authority;

    if (spin.current !== 0) {
      bearing.applyAxisAngle(up, spin.current * authority);
    }

    if (tilt.current !== 0) {
      /*
       * Elevation is applied about the axis across the view, and clamped by how
       * far the bearing already leans rather than by the raw drag — the pose's
       * own tilt varies with the zoom, so a fixed limit on the input would bite
       * at a different place at each end of the range.
       */
      const side = across.current.crossVectors(up, bearing);

      if (side.lengthSq() > 1e-6) {
        side.normalize();

        const leaning = Math.acos(Math.min(Math.max(bearing.dot(up), -1), 1));
        const wantedLean = leaning + tilt.current;
        const allowed = Math.min(
          Math.max(wantedLean, TILT_LIMIT),
          Math.PI - TILT_LIMIT
        );

        bearing.applyAxisAngle(side, (allowed - leaning) * authority);
      }
    }

    /*
     * Roll last, about the view axis, so it turns the picture rather than
     * moving the camera. Scaled by the zoom like everything else — the diagonal
     * arrives with the composition instead of snapping on at the end.
     */
    if (eased > 1e-4) {
      up.applyAxisAngle(bearing, ROLL * eased).normalize();
    }

    const distance = pose.distance + (farDistance - pose.distance) * eased;
    const target = scratch.current.copy(pose.target).lerp(farTarget, eased);

    perspective.position.copy(target).addScaledVector(bearing, distance);
    perspective.up.copy(up);
    perspective.lookAt(target);
  };

  Fiber.useFrame((state, delta) => {
    const perspective = camera as THREE.PerspectiveCamera;
    const anchor = getAnchor(nodeId);

    fitFrustum(perspective);

    /*
     * Settle the near pose first. Until the route's taxon has been framed there
     * is nothing to pull back *from*, so the camera is left where it opened.
     */
    if (framed.current !== nodeId && nodeId && anchor && ancestorId) {
      const count = anchorCount();

      placed.current =
        count === placed.current.count
          ? { count, held: placed.current.held + 1 }
          : { count, held: 0 };

      const ancestor = getAnchor(ancestorId);
      const ready =
        ancestor &&
        chains.every((id) => getAnchor(id)) &&
        placed.current.held >= STABLE_FRAMES;

      waiting.current ??= state.clock.elapsedTime;

      if (ready || state.clock.elapsedTime - waiting.current >= GRACE) {
        settle(perspective, anchor, ancestor);
        framed.current = nodeId;
        waiting.current = null;
        wanted.current = 0;
        zoom.current = 0;
        spin.current = 0;
        tilt.current = 0;
      }
    }

    if (framed.current === null || !anchor) {
      return;
    }

    /*
     * One number is damped and the pose is read straight off it. Framerate
     * independent, and it cannot overshoot, so the far end never bounces.
     */
    zoom.current +=
      (wanted.current - zoom.current) * (1 - Math.exp(-ZOOM_EASE * delta));

    // Published so anything outside the rig can tell how far out the view is.
    setZoom(zoom.current);

    compose(perspective, anchor);
  });

  return null;
};

export default CameraRig;

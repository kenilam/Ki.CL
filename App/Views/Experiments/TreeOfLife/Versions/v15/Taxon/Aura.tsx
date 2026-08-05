import React, { useMemo, useRef } from 'react';

import THREE, { Drei, Fiber } from '@/Three';

/**
 * Emphasis for the two taxa that mean something beyond their place in the
 * tree: the one being looked at, and the origin of life.
 *
 * They are deliberately different in character. `active` is a sonar ripple —
 * two rings travelling out of phase, so one is always mid-flight — which
 * reads as *here, now*. `origin` is a slow breath that does not travel: the
 * root is permanent, not a thing demanding attention, and giving it the same
 * pulse would have the two compete.
 *
 * Billboarded so the rings stay circular from any angle, and opted out of
 * raycasting so they can never intercept a click meant for a taxon behind
 * them.
 */

export type Variant = 'active' | 'origin';

const RIPPLE_PERIOD_MS = 2600;
const ORIGIN_PERIOD_MS = 5200;

/**
 * Ripple travel, as a multiple of the body's own radius.
 *
 * Bodies here are barely two units across, so a ripple that only reaches
 * two-and-a-half radii never clears the node it is marking — it reads as a
 * slightly fat outline rather than as a signal. Travelling several times the
 * body's width is what makes it legible against a tree of this scale.
 */
const RIPPLE_FROM = 1.4;
const RIPPLE_TO = 6.2;
const RIPPLE_PEAK_OPACITY = 0.95;

/**
 * How far the ripple is lifted toward white, away from the taxon's own hue.
 *
 * Tinted with the body's colour it was a green ring on a green node — the
 * same value as everything around it, so it only registered as motion.
 * Lifting it reads as light coming off the taxon rather than as more of the
 * taxon, which is what makes it obvious near the body where it starts.
 */
const RIPPLE_WHITEN = 0.72;

/** The origin's breath is wider still — it marks a place, not an event. */
const ORIGIN_RING_FROM = 2.1;
const ORIGIN_RING_TO = 2.9;
const ORIGIN_HALO_SCALE = 4.2;

/**
 * Soft falloff, painted once into a texture and shared by every aura.
 *
 * A ring built from geometry has a hard inner and outer edge, which reads as
 * a drawn outline however faint it is made — the thing that says "glow" is
 * the gradient, not the shape. Painting the falloff means the blur survives
 * being scaled up as the ripple travels, where a geometric ring would just
 * become a bigger hard ring.
 *
 * White, so the mesh's own colour tints it, and built lazily so this module
 * can be imported anywhere.
 */
const RESOLUTION = 128;

function paint(stops: readonly (readonly [number, number])[]): THREE.Texture {
  const canvas = document.createElement('canvas');

  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;

  const context = canvas.getContext('2d');

  if (context) {
    const middle = RESOLUTION / 2;
    const gradient = context.createRadialGradient(
      middle,
      middle,
      0,
      middle,
      middle,
      middle
    );

    stops.forEach(([at, alpha]) => {
      gradient.addColorStop(at, `rgba(255, 255, 255, ${alpha})`);
    });

    context.fillStyle = gradient;
    context.fillRect(0, 0, RESOLUTION, RESOLUTION);
  }

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

let ringTexture: THREE.Texture | null = null;
let haloTexture: THREE.Texture | null = null;

/** A band that fades out on both sides — a ripple, not an outline. */
function ring(): THREE.Texture {
  ringTexture ??= paint([
    [0, 0],
    [0.52, 0],
    [0.78, 1],
    [0.93, 0.35],
    [1, 0],
  ]);

  return ringTexture;
}

/** A disc brightest at its centre — the origin's steady glow. */
function halo(): THREE.Texture {
  haloTexture ??= paint([
    [0, 1],
    [0.35, 0.6],
    [0.7, 0.18],
    [1, 0],
  ]);

  return haloTexture;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  );
}

type Props = {
  variant: Variant;
  /** World radius of the body this decorates. */
  radius: number;
  color: string;
  /** The taxon's own growth, so an aura never outlives the thing it marks. */
  present?: () => number;
};

const Aura: React.FunctionComponent<Props> = ({
  variant,
  radius,
  color,
  present,
}) => {
  /*
   * The ripple burns toward white; the origin's breath keeps the taxon's own
   * colour. They are marking different things — an event against a steady
   * presence — and giving them the same treatment would flatten that.
   */
  const tint = useMemo(
    () =>
      variant === 'active'
        ? `#${new THREE.Color(color)
            .lerp(new THREE.Color('#ffffff'), RIPPLE_WHITEN)
            .getHexString()}`
        : color,
    [variant, color]
  );
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  // Read once: a preference that changes mid-session is not worth a listener
  // here, and the alternative is querying matchMedia every frame.
  const reduced = useMemo(prefersReducedMotion, []);

  Fiber.useFrame(({ clock }) => {
    const grown = present ? Math.min(1, Math.max(0, present())) : 1;

    if (grown <= 0.01) {
      [ringA, ringB, haloRef].forEach((ref) => {
        if (ref.current) {
          ref.current.visible = false;
        }
      });

      return;
    }

    // Frozen at phase zero when motion is unwelcome — still drawn, still
    // marking the taxon, just not moving.
    const elapsed = reduced ? 0 : clock.getElapsedTime() * 1000;

    if (variant === 'active') {
      [ringA, ringB].forEach((ref, index) => {
        const mesh = ref.current;

        if (!mesh) {
          return;
        }

        // Half a period apart, so the pair never rests together.
        const phase =
          ((elapsed + index * (RIPPLE_PERIOD_MS / 2)) % RIPPLE_PERIOD_MS) /
          RIPPLE_PERIOD_MS;

        mesh.visible = true;
        mesh.scale.setScalar(
          radius * (RIPPLE_FROM + (RIPPLE_TO - RIPPLE_FROM) * phase) * grown
        );

        // Eased so it lingers near the body and thins as it leaves.
        (mesh.material as THREE.MeshBasicMaterial).opacity =
          RIPPLE_PEAK_OPACITY * (1 - phase) ** 1.6 * grown;
      });

      return;
    }

    const breath =
      (Math.sin((elapsed / ORIGIN_PERIOD_MS) * Math.PI * 2) + 1) / 2;

    if (ringA.current) {
      ringA.current.visible = true;
      ringA.current.scale.setScalar(
        radius *
          (ORIGIN_RING_FROM + (ORIGIN_RING_TO - ORIGIN_RING_FROM) * breath) *
          grown
      );
      (ringA.current.material as THREE.MeshBasicMaterial).opacity =
        (0.4 + 0.3 * breath) * grown;
    }

    if (haloRef.current) {
      haloRef.current.visible = true;
      haloRef.current.scale.setScalar(radius * ORIGIN_HALO_SCALE * grown);
      (haloRef.current.material as THREE.MeshBasicMaterial).opacity =
        (0.14 + 0.1 * (1 - breath)) * grown;
    }
  });

  /*
   * A unit quad carrying the falloff, so scale reads straight across as
   * radius. Purely decorative: it must neither occlude the tree nor be
   * occluded by it, hence no depth write and no tone mapping.
   */
  const surface = (texture: THREE.Texture) => (
    <meshBasicMaterial
      color={tint}
      map={texture}
      transparent
      opacity={0}
      depthWrite={false}
      side={THREE.DoubleSide}
      toneMapped={false}
    />
  );

  return (
    <Drei.Billboard>
      {variant === 'origin' ? (
        <mesh ref={haloRef} raycast={() => null}>
          <planeGeometry args={[2, 2]} />
          {surface(halo())}
        </mesh>
      ) : null}

      <mesh ref={ringA} raycast={() => null}>
        <planeGeometry args={[2, 2]} />
        {surface(ring())}
      </mesh>

      {variant === 'active' ? (
        <mesh ref={ringB} raycast={() => null}>
          <planeGeometry args={[2, 2]} />
          {surface(ring())}
        </mesh>
      ) : null}
    </Drei.Billboard>
  );
};

export default Aura;

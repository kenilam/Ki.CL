/**
 * How far out the view currently is, from 0 at the focused taxon to 1 at the
 * whole lineage.
 *
 * `CameraRig` owns the number and publishes it here; anything that needs to
 * behave differently at the two ends reads it back. Deliberately outside React
 * for the same reason the anchors are: it changes on every frame of a zoom, and
 * routing that through state would re-render the entire tree sixty times a
 * second to tell a click handler something it can look up.
 */
let level = 0;

export function setZoom(value: number): void {
  level = value;
}

export function getZoom(): number {
  return level;
}

/**
 * Past this, the view is treated as fully pulled back.
 *
 * The zoom approaches its destination asymptotically and never quite arrives,
 * so "all the way out" has to be a threshold rather than an equality. Close
 * enough that it only reads true when the composition has visibly settled.
 */
const PULLED_BACK = 0.97;

/**
 * Whether the view is far enough out that taxa should stop taking clicks.
 *
 * Out there a taxon is a couple of pixels across and the lineage is the
 * subject, not any one node in it — a click is far likelier to be a misfire
 * than a choice, and navigating away from a picture you were reading is an
 * expensive mistake to undo.
 */
export function isPulledBack(): boolean {
  return level >= PULLED_BACK;
}

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

/*
 * Whether the camera has finished flying to the taxon in the route.
 *
 * Unlike the zoom above this *is* announced to React, because the tree has to
 * react to it: a focused taxon shows its clade in full, and a domain like
 * Bacteria has 153 direct descendants — roughly three hundred geometries built
 * in one commit, measured at a 383ms frame. Landing that during the flight
 * stalls the very motion it interrupts, so the fan waits until the camera has
 * arrived. It flips twice per navigation, not once per frame, so the
 * subscription costs nothing between moves.
 *
 * Starts false so a cold load is covered too. Landing straight on a URL never
 * flies — the first framing of a session snaps rather than sweeping in from the
 * opening standoff — so without this the gate was already open on the very
 * first frame and the heaviest clade in the tree mounted in the same commit as
 * everything else.
 */
let arrived = false;

const listeners = new Set<() => void>();

export function setSettled(value: boolean): void {
  if (value === arrived) {
    return;
  }

  arrived = value;
  listeners.forEach((listener) => listener());
}

export function getSettled(): boolean {
  return arrived;
}

export function subscribeSettled(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

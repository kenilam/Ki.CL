export type LabelInput = {
  text: string;
  position: readonly [number, number, number];
  /** Higher wins a contested seat. */
  priority: number;
  /** Body radius in world units, so its projected size can be an obstacle. */
  radius: number;
  /**
   * Border colour, set only by the taxon the route is on.
   *
   * The focused taxon already announces itself in the scene with an aura in
   * its own colour; carrying that colour onto its label ties the name to the
   * body rather than leaving the reader to work out which of a dozen chips
   * belongs to the thing being looked at. Every other label keeps the neutral
   * chip border, so the accent means exactly one thing.
   */
  accent?: string;
};

/**
 * Every taxon publishes its own label here.
 *
 * The alternative - the canvas assembling the list - only ever worked for the
 * lineage, because that is the only part whose positions the canvas knows.
 * Descendants derive their own tips inside `Taxon` and never report them, so
 * they could not be labelled at all. Letting the thing that knows where it is
 * say what it is called fixes that, and keeps the two from drifting apart.
 */
export const registry = new Map<string, LabelInput>();

/**
 * Where each label currently sits, remembered between frames.
 *
 * Held as a bearing and an offset from its node rather than as a screen
 * position: an absolute seat means nothing once the camera moves, whereas an
 * offset stays meaningful and can be carried, compared and eased.
 */
export type Seat = {
  ring: number;
  angle: number;
  /** Current offset from the node, eased toward the chosen bearing. */
  dx: number;
  dy: number;
  started: boolean;
  /** Whether it is currently displayed, so hiding can want more than showing. */
  shown: boolean;
};

export const seats = new Map<string, Seat>();

/*
 * Membership is React's business, so changes to it have to be announced.
 * Registration happens in a taxon's effect, and every taxon's effect runs in
 * the same commit, so the notifications batch into one re-render of the layer.
 */
const listeners = new Set<() => void>();
let version = 0;

function publish(): void {
  version += 1;
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getVersion(): number {
  return version;
}

/**
 * Add or update a label.
 *
 * Membership and content are separate on purpose. A taxon's label changes
 * whenever the route does - its priority and accent both depend on what is
 * focused - and if that were expressed as unregister-then-register, the entry
 * would leave the map for an instant and React would tear the pill down and
 * build a new one. A taxon present in both the old and new lineage would blink
 * on every navigation despite never actually going anywhere.
 *
 * So only a change React has to see re-renders the layer. Position and
 * priority are read by the frame loop straight off the registry, so moving a
 * label costs nothing.
 */
export function setLabel(key: string, input: LabelInput): void {
  const previous = registry.get(key);

  // Back before the sweep ran - a re-parent, not a departure.
  pending.delete(key);

  registry.set(key, input);

  if (
    !previous ||
    previous.text !== input.text ||
    previous.accent !== input.accent
  ) {
    publish();
  }
}

/**
 * Keys whose taxon has unmounted but which may be about to come straight back.
 *
 * A taxon that appears in both the old and the new lineage still unmounts when
 * the recursion re-parents it - it was drawn under one ancestor and is now
 * drawn under another - and React tears the component down and builds a new one
 * for the new position. Removing on that cleanup destroyed the pill and rebuilt
 * it, which is a blink for a label that never actually went anywhere: measured,
 * 11 of 18 labels present in both lineages were being rebuilt.
 *
 * So removal is deferred by a frame. Anything re-registered in the meantime is
 * a re-parent and keeps its element; anything still pending has genuinely gone.
 */
const pending = new Set<string>();
let sweeping = 0;

/**
 * How long a departed label is held before it is really dropped.
 *
 * Long enough to outlast the mount cascade: the replacement tree arrives a
 * slice per frame, so a taxon's counterpart can be a second or more behind the
 * unmount. A single frame of grace - which is what this was first written as -
 * expired long before the taxon came back, and the label was rebuilt anyway.
 */
const REMOVAL_GRACE = 2500;

/**
 * Every taxon currently drawn, by node id.
 *
 * The registry already knows exactly this - it is populated by each taxon as
 * it mounts and emptied as it leaves - so anything wanting "what is on screen"
 * can read it here rather than assembling a second list that would drift.
 * Pending removals are excluded: their taxon has gone even if the pill is
 * being held a moment in case it returns.
 */
export function drawnTaxa(): string[] {
  return [...registry.keys()].filter((key) => !pending.has(key));
}

/*
 * The same store the layer subscribes to, exposed so anything listing the drawn
 * taxa re-reads when that set changes. `drawnTaxa` builds a fresh array on every
 * call, so it cannot be the snapshot itself - the version is, and callers derive
 * the list from it.
 */
export { subscribe as subscribeDrawn, getVersion as drawnVersion };

export function isPendingRemoval(key: string): boolean {
  return pending.has(key);
}

function sweep(): void {
  sweeping = 0;

  if (pending.size === 0) {
    return;
  }

  pending.forEach((key) => {
    registry.delete(key);
    // A remembered bearing outlives its label otherwise, and the tree churns
    // through thousands of them across a session.
    seats.delete(key);
  });

  pending.clear();
  publish();
}

/**
 * Drop a label, unless its taxon comes back.
 *
 * The element is kept alive in the meantime but hidden, so a taxon that is
 * merely being re-parented reuses its pill instead of having a new one built -
 * which is what made a label blink on a route change despite never leaving the
 * tree. Nothing stale is drawn, because a pending label is not seated.
 */
export function removeLabel(key: string): void {
  if (!registry.has(key)) {
    return;
  }

  pending.add(key);

  window.clearTimeout(sweeping);
  sweeping = window.setTimeout(sweep, REMOVAL_GRACE);
}

type Projected = {
  key: string;
  text: string;
  accent?: string;
  x: number;
  y: number;
  priority: number;
  radiusPx: number;
  visible: boolean;
};

type Store = {
  projected: Projected[];
  width: number;
  height: number;
};

export const store: Store = { projected: [], width: 0, height: 0 };

/**
 * The taxon under the pointer, if any.
 *
 * Read by the frame loop rather than announced to React: hovering changes
 * where one pill sits, not which pills exist, and the loop is already running.
 *
 * A hovered label is placed unconditionally. Every other label can lose its
 * seat to a more important one and vanish, which is right when the layer is
 * choosing for you - but pointing at something is the one moment you have
 * asked for a specific name, and answering "no room" is never the useful reply.
 */
let hovered: string | null = null;

export function setHovered(nodeId: string | null): void {
  hovered = nodeId;
}

export function getHovered(): string | null {
  return hovered;
}

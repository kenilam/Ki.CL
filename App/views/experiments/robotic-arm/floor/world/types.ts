import type { AmrCommands, ArmCommands, Task } from 'arm/frames';
import type { Hex, Point } from 'arm/grid';
import type { Pose } from 'arm/robot';

/*
 * The plant: everything on the floor and where it is. The floor's loop is the
 * only writer, and the meshes read it every frame without React rendering
 * again, so nothing here is React state.
 */

type CaseKind = 'box' | 'crate' | 'tub' | 'cylinder';

/** Width, height and depth, in metres. */
type Size = readonly [number, number, number];

type Arm = {
  id: string;
  /** Centre of the arm's cell. */
  cell: Hex;
  /** Which way the base faces at a base angle of 0, in radians about y. */
  heading: number;
  /** Joint encoders: where the drives have the joints now. */
  pose: Pose;
  velocity: Pose;
  vacuum: boolean;
  /** The case sealed on the pad. */
  held: string | null;
  /** The last command from the arm's brain; the drives work towards it. */
  command: ArmCommands | null;
};

type Pallet = {
  id: string;
  arm: string;
  /** The slot it belongs in. */
  home: Hex;
  position: { x: number; y: number; z: number };
  heading: number;
  /** The AMR carrying it, if any. */
  carrier: string | null;
};

/** What a case rests on, and where on it. */
type Holder =
  | { kind: 'belt'; belt: string; along: number }
  | { kind: 'pad'; arm: string; yaw: number }
  /** In the pallet's own frame, from the centre of its underside. */
  | {
      kind: 'pallet';
      pallet: string;
      u: number;
      y: number;
      w: number;
      yaw: number;
    }
  | { kind: 'floor' };

type Case = {
  id: string;
  kind: CaseKind;
  size: Size;
  /** Kilograms. */
  weight: number;
  friction: number;
  holder: Holder;
  position: { x: number; y: number; z: number };
  heading: number;
};

type Belt = {
  id: string;
  arm: string;
  start: Point;
  heading: number;
  length: number;
  width: number;
  /** Surface speed, in metres a second. */
  speed: number;
  /** Seconds between cases. */
  every: number;
  /** Seconds until the next case. */
  due: number;
};

type Obstacle = {
  id: string;
  kind: 'wall' | 'pillar' | 'post';
  position: Point;
  size: Size;
  heading: number;
};

/** A person following a closed path. */
type Walker = {
  id: string;
  path: readonly Point[];
  speed: number;
  /** Metres travelled round the path. */
  travelled: number;
  position: Point;
  heading: number;
};

type Amr = {
  id: string;
  position: Point;
  /** Direction of travel, in radians about y; 0 is +z. */
  heading: number;
  lifted: boolean;
  pallet: string | null;
  /** The job the fleet manager has given it. */
  task: Task | null;
  command: AmrCommands | null;
  /** Its own hexes at the depot: where it empties pallets, and where it waits. */
  staging: Hex;
  park: Hex;
};

type World = {
  time: number;
  arms: Arm[];
  pallets: Pallet[];
  belts: Belt[];
  cases: Case[];
  obstacles: Obstacle[];
  workers: Walker[];
  amrs: Amr[];
  /** The hexes drawn and driven on: everything within `radius` of `centre`. */
  ground: { centre: Hex; radius: number };
  /** Counts cases made, for ids and their order in the catalogue. */
  made: number;
};

export type {
  Amr,
  Arm,
  Belt,
  Case,
  CaseKind,
  Holder,
  Obstacle,
  Pallet,
  Size,
  Walker,
  World,
};

import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Hub
import {
  type Capacity,
  type Console,
  open,
  type Outbound,
  type Riding,
  type Target,
} from '@/views/experiments/factory-arm/cell/hub';

// Protocol
import type { Box } from '@/views/experiments/factory-arm/cell/protocol';

// Grid
import {
  type Child,
  childCentre,
} from '@/views/experiments/factory-arm/cell/grid/child';
import {
  type Hex,
  index,
  neighbour,
  opposite,
} from '@/views/experiments/factory-arm/cell/grid/hex';
import {
  apart,
  covers,
  extended,
  free,
  type Layout,
  type Line,
  line as geometry,
  reaches,
} from '@/views/experiments/factory-arm/cell/grid/layout';

// Protocol
import type {
  Joints,
  Telemetry,
} from '@/views/experiments/factory-arm/cell/protocol';

// Station
import type {
  Event,
  Rider,
} from '@/views/experiments/factory-arm/cell/station/events';
import type { Case } from '@/views/experiments/factory-arm/cell/station/spec';

// Partials
import {
  beside,
  clear,
  moved,
  rest,
  room,
  type Shape,
  solids,
  stand,
  turned,
} from './obstacles';
import { pile } from './pile';
import { relocate as moveArm } from './relocate';
import { type Simulation, SIMULATIONS } from './simulations';
import { standing } from './standing';
import { useSaved } from './store';
import { withdraw } from './withdraw';

/** One station as the page knows it. */
type Station = { arm: string; hex: Hex; layout: Layout };

/** What a station last said about the cases round it. Read every frame, so a ref. */
type Cell = { cases: Case[]; holding: Case | null; riders: Rider[] };

/** One line of the log. */
type Entry = {
  id: number;
  at: number;
  arm: string;
  level: Extract<Event, { type: 'note' }>['level'];
  text: string;
  detail?: string;
};

type Value = {
  simulations: Simulation[];
  /** The simulation playing, and how many times one has been started, which keys the scene. */
  active: Simulation;
  run: number;
  /** Whether the floor has nothing left to do: every pallet sent, every arm idle, nothing on a belt. */
  finished: boolean;
  /** Whether an arm has its alarm on, so the whole floor stands still. */
  stopped: boolean;
  /** The obstacles standing in each arm as it is posed, by arm id, for those struck. */
  struck: Record<string, string[]>;
  /** The obstacles standing on a belt, by id: each holds its line still. */
  blocking: string[];
  /** Starts, or starts over, `simulation`. */
  play: (simulation: Simulation) => void;
  /** Each arm's capacity as last set, by arm id. */
  capacities: Record<string, Capacity>;
  /** Whether the floor has been changed since it was started or saved. */
  edited: boolean;
  /** Saves the floor as it stands as a simulation named `name`, or numbered when it has none. */
  save: (name?: string) => void;
  /** The name a new simulation gets unless the operator gives one. */
  next: string;
  discard: (id: string) => void;
  stations: Station[];
  /** The belt lines on the floor. */
  lines: Line[];
  /** What rides each line, by line id, as last reported, with whether the belt was running and when. Read every frame, so a ref. */
  riders: React.RefObject<
    Map<string, { riders: Riding[]; running: boolean; at: number }>
  >;
  /** Moves an arm to `hex`, its pallets with it, if an arm may stand there. Says whether it did. */
  relocate: (arm: string, hex: Hex) => boolean;
  /** Moves a pallet to a free slot of an arm. Says whether it did. */
  move: (pallet: string, at: Child) => boolean;
  /** Adds an arm on `arm`, a pallet with a fresh pile on `pallet`, or an obstacle, if it may stand there. Says whether it did. */
  add: (what: { arm: Hex } | { pallet: Child } | { obstacle: Box }) => boolean;
  /** The ids the next arm, pallet and obstacle added would get. */
  coming: { arm: string; pallet: string; obstacle: string };
  /** Whether an arm may stand in `hex`: on a line, no other arm there, no obstacle on its stand. */
  standable: (arm: string, hex: Hex) => boolean;
  /** Whether a pallet may stand on `at`: a free slot of an arm, with no obstacle over it. */
  placeable: (pallet: string, at: Child) => boolean;
  /** The obstacles on the floor, in its frame. */
  obstacles: Box[];
  /** Whether an obstacle may stand as `box`: on nothing but the floor and the belts. */
  blockable: (box: Box) => boolean;
  /** Sets a new obstacle of `shape` down beside a belt, where there is room. Says whether it did. */
  put: (shape: Shape) => boolean;
  /** Moves an obstacle's footprint to be centred on `to`, on top of any belt there, if it may stand there. Says whether it did. */
  shift: (obstacle: string, to: { x: number; z: number }) => boolean;
  /** Raises an obstacle `by` metres, or lowers it for a negative `by`, never below the floor or into a belt. Says whether it did. */
  raise: (obstacle: string, by: number) => boolean;
  /** Gives an obstacle a quarter turn about its middle, if it may stand so. Says whether it did. */
  turn: (obstacle: string) => boolean;
  /** Takes an obstacle off the floor. */
  unblock: (obstacle: string) => void;
  /**
   * Takes an arm, a pallet or an obstacle off the floor. An arm's pallets
   * go with it and what was bound for it goes to the next arm along; the
   * last arm on a line stays. Says whether it went.
   */
  takeOff: (what: {
    kind: 'arm' | 'pallet' | 'obstacle';
    id: string;
  }) => boolean;
  targets: Target[];
  log: Entry[];
  /** Goes up whenever which cases a station has changes, so the scene draws the right ones. */
  revision: number;
  /** Where each arm is, by arm id, as last reported. */
  telemetry: React.RefObject<Map<string, Telemetry>>;
  /** Each arm's joints as drawn this frame, by arm id: eased toward telemetry, so what hangs from the pad follows the drawn arm. */
  drawn: React.RefObject<Map<string, Joints>>;
  /** Each station's cases, by arm id, as last reported. */
  cells: React.RefObject<Map<string, Cell>>;
  /** Cases refused for now, by id, with the obstacles in their way. */
  parked: React.RefObject<Map<string, string[]>>;
  /** Pallets each station set down for itself, by arm id, where the line ends. */
  extras: Record<string, [number, number, number][]>;
  place: (target: Omit<Target, 'claimed' | 'version'>) => void;
  plan: (id: string, change: { queue?: string[]; to?: Hex }) => void;
  remove: (id: string) => void;
  configure: (arm: string, capacity: Capacity) => void;
  /** Adds a case to the end of its pallet's queue, or takes it off. */
  toggle: (id: string) => void;
  clearLog: () => void;
};

/** How many lines the log keeps. */
const LIMIT = 500;

const Context = React.createContext<Value | null>(null);

/**
 * The hub for this page, in its worker, and what it has said since: the
 * stations' layouts, the board, and each arm's telemetry and cases. Cases
 * and telemetry change every frame, so they are refs the scene reads in its
 * loop; the board and the log are state, so the panel follows them.
 */
const HubProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  // Opened in the effect, so a mount, unmount and mount again in development gets a live one each time.
  const hub = useRef<Console | null>(null);
  const { discard: drop, save: keep, saved } = useSaved();
  const [active, setActive] = useState(SIMULATIONS[0]);
  const [edited, setEdited] = useState(false);
  const [run, setRun] = useState(0);
  const [capacities, setCapacities] = useState<Record<string, Capacity>>({});
  const [stations, setStations] = useState<Station[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [idle, setIdle] = useState<Record<string, boolean>>({});
  const [alarms, setAlarms] = useState<Record<string, boolean>>({});
  const [struck, setStruck] = useState<Record<string, string[]>>({});
  const [riding, setRiding] = useState(false);
  const riders = useRef(
    new Map<string, { riders: Riding[]; running: boolean; at: number }>()
  );
  const [targets, setTargets] = useState<Target[]>([]);
  const [obstacles, setObstacles] = useState<Box[]>([]);
  const [log, setLog] = useState<Entry[]>([]);
  const [extras, setExtras] = useState<Value['extras']>({});
  const telemetry = useRef(new Map<string, Telemetry>());
  const drawn = useRef(new Map<string, Joints>());
  const cells = useRef(new Map<string, Cell>());
  const parked = useRef(new Map<string, string[]>());
  const counted = useRef(0);
  const [revision, setRevision] = useState(0);
  // What each station last had, as ids, to tell a change of cases from a change of place.
  const had = useRef(new Map<string, string>());

  const note = useCallback(
    (arm: string, text: string, level: Entry['level'], detail?: string) => {
      counted.current += 1;

      const entry = {
        id: counted.current,
        at: Date.now(),
        arm,
        level,
        text,
        detail,
      };

      setLog((current) => [entry, ...current].slice(0, LIMIT));
    },
    []
  );

  /** Builds the floor again from `simulation` and sets it going. */
  const play = useCallback(
    (simulation: Simulation) => {
      const console = hub.current;

      if (!console) {
        return;
      }

      telemetry.current.clear();
      drawn.current.clear();
      cells.current.clear();
      parked.current.clear();
      had.current.clear();
      riders.current.clear();
      // The stations, lines and pallets stay drawn till the hub sends the new ones, so nothing blinks.
      setExtras({});
      setIdle({});
      setAlarms({});
      setStruck({});
      setRiding(false);
      setObstacles(simulation.obstacles ?? []);
      setCapacities(simulation.capacities ?? {});
      setActive(simulation);
      setEdited(false);
      setRun((count) => count + 1);
      note('hub', `Started ${simulation.name}`, 'info');
      console.send({
        type: 'build',
        cells: simulation.cells,
        lines: simulation.lines,
      });
      // Before the stations load, so each starts knowing what stands in its cell.
      console.send({
        type: 'block',
        boxes: simulation.obstacles ?? [],
        moved: false,
      });
      simulation.cells.forEach(({ hex }) =>
        console.send({ type: 'load', hex })
      );
      simulation.pallets.forEach((target) =>
        console.send({ type: 'place', target })
      );
      Object.entries(simulation.capacities ?? {}).forEach(
        ([arm, capacity]: [string, Capacity]) =>
          console.send({ type: 'configure', arm, capacity })
      );
    },
    [note]
  );

  useEffect(() => {
    const console = open();

    hub.current = console;

    const unlisten = console.listen((message: Outbound) => {
      if (message.type === 'layouts') {
        setStations(message.stations);
        setLines(message.lines);

        return;
      }

      if (message.type === 'riders') {
        const before = riders.current.get(message.line)?.riders;

        riders.current.set(message.line, {
          riders: message.riders,
          running: message.running,
          at: performance.now(),
        });
        setRiding(
          [...riders.current.values()].some(
            ({ riders: riding }) => riding.length > 0
          )
        );

        // A case on or off a line: the scene draws a different set.
        if (
          before?.length !== message.riders.length ||
          before.some(({ id }, at) => id !== message.riders[at].id)
        ) {
          setRevision((count) => count + 1);
        }

        return;
      }

      if (message.type === 'board') {
        setTargets(message.targets);

        return;
      }

      const { arm, event } = message;

      switch (event.type) {
        case 'telemetry':
          telemetry.current.set(arm, event.report);

          return;
        case 'cell': {
          cells.current.set(arm, event);

          const ids = [
            ...event.cases.map(({ id }) => id),
            '|',
            ...event.riders.map(({ id }) => id),
            '|',
            event.holding?.id,
          ].join();

          if (had.current.get(arm) !== ids) {
            had.current.set(arm, ids);
            setRevision((count) => count + 1);
          }

          return;
        }
        case 'refuse':
          parked.current.set(event.target, event.across);

          return;
        case 'unpark':
          parked.current.delete(event.target);

          return;
        case 'pallet':
          setExtras((current) => ({
            ...current,
            [arm]: [...(current[arm] ?? []), event.at],
          }));

          return;
        case 'idle':
          setIdle((current) => ({ ...current, [arm]: event.idle }));

          return;
        case 'struck':
          setStruck((current) => {
            const { [arm]: gone, ...rest } = current;

            void gone;

            return event.obstacles.length
              ? { ...rest, [arm]: event.obstacles }
              : rest;
          });

          return;
        case 'alarm':
        case 'calm':
          setAlarms((current) => ({
            ...current,
            [arm]: event.type === 'alarm',
          }));

          return;
        case 'note':
          note(arm, event.text, event.level, event.detail);

          return;
        default:
          return;
      }
    });

    play(SIMULATIONS[0]);

    return () => {
      unlisten();
      console.close();
      hub.current = null;
    };
  }, [note, play]);

  const place = useCallback<Value['place']>(
    (target) => hub.current?.send({ type: 'place', target }),
    []
  );
  const plan = useCallback<Value['plan']>((id, change) => {
    setEdited(true);
    hub.current?.send({ type: 'plan', id, ...change });
  }, []);
  const remove = useCallback<Value['remove']>((id) => {
    setEdited(true);
    hub.current?.send({ type: 'remove', id });
  }, []);
  const configure = useCallback<Value['configure']>((arm, capacity) => {
    setEdited(true);
    setCapacities((current) => ({ ...current, [arm]: capacity }));
    hub.current?.send({ type: 'configure', arm, capacity });
  }, []);

  const next = `Saved ${saved.length + 1}`;

  /** The floor as it stands, to play again after a change to where things are. */
  const floor = useCallback(
    () => ({
      ...standing({
        active,
        capacities,
        cases: (arm) => cells.current.get(arm)?.cases ?? [],
        extras,
        stations,
        targets,
      }),
      obstacles,
    }),
    [active, capacities, extras, obstacles, stations, targets]
  );

  /** Puts what was riding the lines back on them, bound as before, or for `moved` cells. */
  const reride = useCallback((moved: (cell: Hex) => Hex) => {
    riders.current.forEach(({ riders: riding }, line) =>
      hub.current?.send({
        type: 'ride',
        line,
        riders: riding.map((rider) => ({
          ...rider,
          to: rider.to && moved(rider.to),
        })),
      })
    );
  }, []);

  const standable = useCallback<Value['standable']>(
    (arm, hex) => {
      const taken = active.cells.some(
        (cell) => cell.arm !== arm && index(cell.hex) === index(hex)
      );
      const lines = active.lines.map((each) => geometry(each.id, each.cells));

      if (
        taken ||
        !lines.some((each) => reaches(each, hex)) ||
        !clear(stand(arm, hex), obstacles)
      ) {
        return false;
      }

      // With the arm there, every belt run on to it must still keep apart from the others.
      const cells = [
        ...active.cells
          .filter((cell) => cell.arm !== arm)
          .map((cell) => cell.hex),
        hex,
      ];
      const floor = lines.map((each) => extended(each, cells));

      return floor.every((a, first) =>
        floor.slice(first + 1).every((b) => apart(a, b))
      );
    },
    [active, obstacles]
  );

  const placeable = useCallback<Value['placeable']>(
    (pallet, at) => {
      const station = stations.find(
        (one) => index(one.hex) === index(at.parent)
      );

      if (!station || !clear(room(pallet, childCentre(at)), obstacles)) {
        return false;
      }

      // Its slot, and the slot facing it across the edge: one pallet between the two.
      const places = [
        at,
        { parent: neighbour(at.parent, at.slot), slot: opposite(at.slot) },
      ];

      return places.every((place) => {
        const found = stations.find(
          (one) => index(one.hex) === index(place.parent)
        );
        const other = targets.some(
          (target) =>
            target.id !== pallet &&
            index(target.at.parent) === index(place.parent) &&
            target.at.slot === place.slot
        );

        return (
          !other &&
          (!found ||
            free(
              {
                ...found.layout,
                pallets: found.layout.pallets.filter(({ id }) => id !== pallet),
              },
              place.slot
            ))
        );
      });
    },
    [obstacles, stations, targets]
  );

  const relocate = useCallback<Value['relocate']>(
    (arm, hex) => {
      const from = active.cells.find((cell) => cell.arm === arm)?.hex;

      if (!from || !standable(arm, hex) || index(from) === index(hex)) {
        return false;
      }

      const moved = (cell: Hex) => (index(cell) === index(from) ? hex : cell);
      const riding = new Map(riders.current);
      const now = floor();
      const { dropped, simulation } = moveArm({
        arm,
        floor: now,
        hex,
        obstructed: (at) => !clear(room('', childCentre(at)), obstacles),
        stations,
      });

      play(simulation);
      riders.current = riding;
      reride(moved);
      dropped.forEach((pallet) =>
        note(
          'hub',
          `Pallet ${pallet.id} removed`,
          'warning',
          `no slot for it at ${arm}; its cases are left on the floor`
        )
      );
      setEdited(true);

      return true;
    },
    [active, floor, note, obstacles, play, reride, stations, standable]
  );

  const finished = useMemo(
    () =>
      stations.length > 0 &&
      stations.every(({ arm }) => idle[arm]) &&
      !riding &&
      targets.every(({ claimed, queue }) => !claimed && queue.length === 0),
    [idle, riding, stations, targets]
  );
  const stopped = useMemo(() => Object.values(alarms).some(Boolean), [alarms]);
  const blocking = useMemo(
    () =>
      obstacles
        .filter((box) => lines.some((line) => covers(line, box)))
        .map(({ id }) => id),
    [lines, obstacles]
  );

  const nextIds = useMemo(
    () => ({
      arm: `arm-${String.fromCharCode(97 + active.cells.length)}`,
      pallet: `p${targets.length + 1}`,
      // Past the highest number given, so a removed one's id isn't given again.
      obstacle: `o${
        Math.max(0, ...obstacles.map(({ id }) => Number(id.slice(1)) || 0)) + 1
      }`,
    }),
    [active.cells.length, obstacles, targets.length]
  );

  /** Everything solid on the floor as it stands, for an obstacle to keep off. */
  const solid = useCallback(
    () =>
      solids({
        cells: (arm) => cells.current.get(arm) ?? { cases: [], holding: null },
        extras,
        lines,
        loose: active.loose ?? [],
        obstacles,
        riders: (line) => riders.current.get(line)?.riders ?? [],
        stations,
        targets,
      }),
    [active.loose, extras, lines, obstacles, stations, targets]
  );

  const blockable = useCallback<Value['blockable']>(
    (box) => clear(box, solid()),
    [solid]
  );

  /** Puts `next` on the floor: the arms hear of it at once, and the floor is edited. */
  const block = useCallback((next: Box[]) => {
    setObstacles(next);
    setEdited(true);
    hub.current?.send({ type: 'block', boxes: next, moved: true });
  }, []);

  const put = useCallback<Value['put']>(
    (shape) => {
      const made = beside(nextIds.obstacle, shape, lines, solid());

      if (!made) {
        note('hub', `No room beside a belt for a ${shape}`, 'warning');

        return false;
      }

      block([...obstacles, made]);

      return true;
    },
    [block, lines, nextIds.obstacle, note, obstacles, solid]
  );

  const shift = useCallback<Value['shift']>(
    (obstacle, to) => {
      const found = obstacles.find(({ id }) => id === obstacle);

      if (!found) {
        return false;
      }

      const next = rest(moved(found, to), lines);

      if (!blockable(next)) {
        return false;
      }

      block(obstacles.map((one) => (one.id === obstacle ? next : one)));

      return true;
    },
    [block, blockable, lines, obstacles]
  );

  const raise = useCallback<Value['raise']>(
    (obstacle, by) => {
      const found = obstacles.find(({ id }) => id === obstacle);

      if (!found) {
        return false;
      }

      const bottom = Math.max(0, found.min.y + by);
      const next = rest(
        {
          ...found,
          min: { ...found.min, y: bottom },
          max: { ...found.max, y: bottom + found.max.y - found.min.y },
        },
        lines
      );

      if (next.min.y === found.min.y || !blockable(next)) {
        return false;
      }

      block(obstacles.map((one) => (one.id === obstacle ? next : one)));

      return true;
    },
    [block, blockable, lines, obstacles]
  );

  const turn = useCallback<Value['turn']>(
    (obstacle) => {
      const found = obstacles.find(({ id }) => id === obstacle);

      if (!found) {
        return false;
      }

      const next = rest(turned(found), lines);

      if (!blockable(next)) {
        return false;
      }

      block(obstacles.map((one) => (one.id === obstacle ? next : one)));

      return true;
    },
    [block, blockable, lines, obstacles]
  );

  const unblock = useCallback<Value['unblock']>(
    (obstacle) => block(obstacles.filter(({ id }) => id !== obstacle)),
    [block, obstacles]
  );

  const add = useCallback<Value['add']>(
    (what) => {
      // An obstacle goes down without the floor starting over: the arms plan round it as it stands.
      if ('obstacle' in what) {
        const settled = rest(what.obstacle, lines);

        if (!blockable(settled)) {
          return false;
        }

        block([...obstacles, settled]);

        return true;
      }

      const now = floor();
      const riding = new Map(riders.current);

      if ('arm' in what) {
        if (!standable(nextIds.arm, what.arm)) {
          return false;
        }

        play({
          ...now,
          cells: [...now.cells, { hex: what.arm, arm: nextIds.arm }],
        });
      } else {
        if (!placeable(nextIds.pallet, what.pallet)) {
          return false;
        }

        // Bound for the end of the first line past that arm; with none, for the arm itself, which restacks it.
        const station = stations.find(
          (one) => index(one.hex) === index(what.pallet.parent)
        );
        const downstream = station?.layout.belts[0]?.downstream ?? [];
        const to = downstream[downstream.length - 1] ?? what.pallet.parent;
        const cases = pile(nextIds.pallet, Date.now() % 1000, 2);

        play({
          ...now,
          pallets: [
            ...now.pallets,
            {
              id: nextIds.pallet,
              at: what.pallet,
              to,
              cases,
              queue: [...cases]
                .sort((a, b) => b.at.y - a.at.y)
                .map((one) => one.id),
            },
          ],
        });
      }

      riders.current = riding;
      reride((cell) => cell);
      setEdited(true);

      return true;
    },
    [
      block,
      blockable,
      floor,
      lines,
      nextIds,
      obstacles,
      placeable,
      play,
      reride,
      standable,
      stations,
    ]
  );

  const move = useCallback<Value['move']>(
    (pallet, at) => {
      if (!placeable(pallet, at)) {
        return false;
      }

      const now = floor();
      const riding = new Map(riders.current);

      play({
        ...now,
        pallets: now.pallets.map((one) =>
          one.id === pallet ? { ...one, at } : one
        ),
      });
      riders.current = riding;
      reride((cell) => cell);
      setEdited(true);

      return true;
    },
    [floor, placeable, play, reride]
  );

  // The floor as it stands: the active layout, the pallets and plans as edited, the capacities as set.
  const save = useCallback<Value['save']>(
    (name) => {
      const simulation: Simulation = {
        id: `saved-${Date.now()}`,
        name: name?.trim() || next,
        cells: active.cells,
        lines: active.lines,
        pallets: targets.map(({ at, cases, id, queue, to }) => ({
          at,
          cases,
          id,
          queue,
          to,
        })),
        capacities,
        obstacles,
      };

      keep(simulation);
      setActive(simulation);
      setEdited(false);
      note('hub', `Saved the floor as ${simulation.name}`, 'info');
    },
    [active, capacities, keep, next, note, obstacles, targets]
  );

  // A removed simulation can't stay the active one: the first shipped takes over as the name shown.
  const discard = useCallback<Value['discard']>(
    (id) => {
      drop(id);
      setActive((current) => (current.id === id ? SIMULATIONS[0] : current));
    },
    [drop]
  );

  const toggle = useCallback<Value['toggle']>(
    (id) => {
      const target = targets.find(({ cases }) =>
        cases.some((one) => one.id === id)
      );

      if (!target) {
        return;
      }

      plan(target.id, {
        queue: target.queue.includes(id)
          ? target.queue.filter((one) => one !== id)
          : [...target.queue, id],
      });
    },
    [plan, targets]
  );

  const takeOff = useCallback<Value['takeOff']>(
    ({ id, kind }) => {
      if (kind === 'obstacle') {
        unblock(id);

        return true;
      }

      const now = floor();
      const riding = new Map(riders.current);

      // A pallet an arm is working can't be taken off the board under it: the floor is built again without it.
      if (kind === 'pallet') {
        if (!now.pallets.some((pallet) => pallet.id === id)) {
          return false;
        }

        play({
          ...now,
          pallets: now.pallets.filter((pallet) => pallet.id !== id),
        });
        riders.current = riding;
        reride((cell) => cell);
        setEdited(true);

        return true;
      }

      const found = withdraw({ arm: id, floor: now });

      if (!found) {
        note(
          'hub',
          `Arm ${id} stays`,
          'warning',
          'a line needs an arm in reach of it'
        );

        return false;
      }

      play(found.simulation);
      riders.current = riding;
      reride(found.heir);
      found.dropped.forEach((pallet) =>
        note('hub', `Pallet ${pallet.id} removed`, 'warning', `with ${id}`)
      );
      setEdited(true);

      return true;
    },
    [floor, note, play, reride, unblock]
  );

  const clearLog = useCallback(() => setLog([]), []);

  const value = useMemo(
    () => ({
      active,
      add,
      blockable,
      blocking,
      capacities,
      cells,
      clearLog,
      configure,
      discard,
      drawn,
      edited,
      extras,
      finished,
      lines,
      coming: nextIds,
      log,
      move,
      next,
      obstacles,
      parked,
      place,
      placeable,
      plan,
      play,
      put,
      raise,
      relocate,
      remove,
      revision,
      riders,
      run,
      save,
      shift,
      simulations: [...SIMULATIONS, ...saved],
      standable,
      stations,
      stopped,
      struck,
      takeOff,
      targets,
      telemetry,
      toggle,
      turn,
      unblock,
    }),
    [
      active,
      add,
      blockable,
      blocking,
      capacities,
      clearLog,
      configure,
      discard,
      drawn,
      edited,
      extras,
      finished,
      lines,
      log,
      move,
      next,
      nextIds,
      obstacles,
      place,
      placeable,
      plan,
      play,
      put,
      raise,
      relocate,
      remove,
      revision,
      run,
      save,
      saved,
      shift,
      standable,
      stations,
      stopped,
      struck,
      takeOff,
      targets,
      toggle,
      turn,
      unblock,
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useHub = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('useHub is used outside HubProvider');
  }

  return value;
};

export { HubProvider, useHub };
export type { Cell, Entry, Simulation, Station };

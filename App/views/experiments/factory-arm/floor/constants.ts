/** Root of every class this part owns. */
const CLASS_NAME = 'kicl--views--experiments--factory-arm';

/** Pixels the pointer may move between press and release and still click. */
const DRAG = 4;

/** The outline colours: round what the pointer is on or has chosen, and round an arm and the obstacle standing in it. */
const OUTLINE = { chosen: '#111111', struck: '#e5322d' };

/** How far one press of an arrow key moves a chosen obstacle, in metres. */
const STEP = 0.05;

const COPY = {
  panel: {
    add: 'Add to the floor',
    arms: 'Arms',
    capacity: 'Pallets per period',
    clear: 'Clear',
    close: 'Close panel',
    destination: 'Bound for',
    empty: 'Nothing yet',
    label: 'Cell',
    log: 'Log',
    name: 'Simulation name',
    obstacles: 'Obstacles',
    open: 'Open panel',
    pallets: 'Pallets',
    play: 'Play',
    replay: 'Start over',
    save: 'Save',
    unsaved: 'Save the floor as a simulation',
    simulations: 'Simulations',
    period: 'Period (s)',
    place: 'Add a pallet',
    queue: 'Queue',
    remove: 'Remove',
    running: 'running',
    shapes: {
      beam: 'Beam',
      crate: 'Crate',
      partition: 'Partition',
      pillar: 'Pillar',
    },
    /** Sizes as width × height × depth, in metres. */
    size: (size: readonly [number, number, number]) =>
      `${size.map((metres) => `${metres} m`).join(' × ')}`,
    tip: 'Double-click an empty hex for an arm, or a slot of an arm for a pallet.',
    obstacle: {
      help: 'How it works',
      keys: [
        { press: ['drag'], does: 'Move' },
        { press: ['left', 'up', 'right', 'down'], does: 'Move' },
        { press: ['shift', 'up', 'down'], does: 'Raise, lower' },
        { press: ['R'], does: 'Rotate' },
        { press: ['del'], does: 'Remove' },
      ],
    },
    slot: 'Slot',
    stopped: 'stopped',
    struck: {
      title: 'Arm struck',
      /** One line per arm with something standing in it. */
      message: (arm: string, obstacles: string[]) =>
        `${obstacles.join(', ')} is in ${arm}. Move it clear to carry on.`,
    },
    unclaimed: 'Waiting for an arm',
  },
  scene:
    'Robot arms on a hex grid, each working the pallets round it, with belts between them',
  title: 'Factory Arm',
};

/** The panel's id, for the buttons that open and close it on small screens. */
const PANEL = `${CLASS_NAME}--panel`;

export { CLASS_NAME, COPY, DRAG, OUTLINE, PANEL, STEP };

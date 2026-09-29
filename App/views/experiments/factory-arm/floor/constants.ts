/** Root of every class this part owns. */
const CLASS_NAME = 'kicl--views--experiments--factory-arm';

/** Pixels the pointer may move between press and release and still click. */
const DRAG = 4;

const COPY = {
  panel: {
    addArm: 'Add an arm',
    addPallet: 'Add a pallet',
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
      pillar: 'Pillar',
    },
    slot: 'Slot',
    stopped: 'stopped',
    unclaimed: 'Waiting for an arm',
  },
  scene:
    'Robot arms on a hex grid, each working the pallets round it, with belts between them',
  title: 'Factory Arm',
};

/** The panel's id, for the buttons that open and close it on small screens. */
const PANEL = `${CLASS_NAME}--panel`;

export { CLASS_NAME, COPY, DRAG, PANEL };

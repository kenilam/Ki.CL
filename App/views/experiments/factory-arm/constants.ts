/** Route segment for this view. */
const PATH = 'factory-arm';

/** Root of every class and custom property this view owns. */
const CLASS_NAME = 'kicl--views--experiments--factory-arm';

const COPY = {
  panel: {
    busy: {
      cancel: 'Keep going',
      confirm: 'Start over',
      message:
        'The arm is still working. Starting over drops the cases it has queued.',
      title: 'Start over?',
    },
    clear: 'Clear',
    close: 'Close setup',
    empty: 'Nothing yet',
    first: 'Opened the page',
    label: 'Setup',
    log: 'Log',
    manual: 'Manual',
    name: 'Preset name',
    open: 'Open setup',
    pile: {
      layers: 'Layers',
      random: 'Random',
      second: 'Second stack',
      seed: 'Seed',
      title: 'Cases',
    },
    play: 'Run',
    preset: 'Preset',
    proceed: 'Proceed',
    remove: 'Remove',
    restart: 'Restart',
    save: 'Save as preset',
    unsaved: 'Save changes as a preset',
    step: 'step',
    steps: 'steps',
    shapes: {
      beam: 'Beam',
      crate: 'Crate',
      hint: 'Drag to the stage',
      pillar: 'Pillar',
      remove: 'Remove obstacle',
      title: 'Obstacles',
    },
  },
  scene: 'A robot arm working a pallet, a buffer pallet and a conveyor',
  skipped: 'No clear path',
  stopped: {
    message: 'No clear way forward or back',
    title: 'Stopped',
  },
  title: 'Factory Arm',
};

/** The setup panel's id, for the buttons that open and close it on small screens. */
const PANEL = `${CLASS_NAME}--panel`;

export { CLASS_NAME, COPY, PANEL, PATH };

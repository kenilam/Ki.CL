/** Route segment for this view. */
const PATH = 'factory-arm';

/** Root of every class and custom property this view owns. */
const CLASS_NAME = 'kicl--views--experiments--factory-arm';

const COPY = {
  scene: 'A robot arm working a pallet, a buffer pallet and a conveyor',
  skipped: 'No clear path',
  stopped: {
    message: 'No clear way forward or back.',
    title: 'Stopped',
  },
  title: 'Factory Arm',
};

/*
 * The frosted pane the notices sit on, as the image agent's header uses,
 * tinted further in `styles.scss` so it reads over the light floor.
 */
const PANE = [
  `${CLASS_NAME}__pane`,
  'kicl-backdrop',
  'kicl-border-radius-md',
  'kicl-padding-block-narrow',
  'kicl-padding-inline-narrow',
];

export { CLASS_NAME, COPY, PANE, PATH };

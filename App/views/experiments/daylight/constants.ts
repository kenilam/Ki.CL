import { PATH as EXPERIMENTS } from '@/views/experiments/constants';

/** Route segment for this view. */
const PATH = 'daylight';

/** Root of every class this view owns. */
const CLASS_NAME = 'kicl--views--experiments--daylight';

/** How often the sun is moved, in milliseconds. It crosses a degree every four minutes. */
const TICK_MS = 30_000;

export type Place = {
  /** Names it in the view's namespace, `place_<context>`. */
  context:
    | 'hong_kong'
    | 'lagos'
    | 'london'
    | 'los_angeles'
    | 'mumbai'
    | 'new_york'
    | 'sao_paulo'
    | 'sydney'
    | 'tokyo';
  latitude: number;
  longitude: number;
  timeZone: string;
};

/** West to east from the date line. */
const PLACES: readonly Place[] = [
  {
    context: 'los_angeles',
    latitude: 34.05,
    longitude: -118.24,
    timeZone: 'America/Los_Angeles',
  },
  {
    context: 'new_york',
    latitude: 40.71,
    longitude: -74.01,
    timeZone: 'America/New_York',
  },
  {
    context: 'sao_paulo',
    latitude: -23.55,
    longitude: -46.63,
    timeZone: 'America/Sao_Paulo',
  },
  {
    context: 'london',
    latitude: 51.51,
    longitude: -0.13,
    timeZone: 'Europe/London',
  },
  {
    context: 'lagos',
    latitude: 6.52,
    longitude: 3.38,
    timeZone: 'Africa/Lagos',
  },
  {
    context: 'mumbai',
    latitude: 19.08,
    longitude: 72.88,
    timeZone: 'Asia/Kolkata',
  },
  {
    context: 'hong_kong',
    latitude: 22.32,
    longitude: 114.17,
    timeZone: 'Asia/Hong_Kong',
  },
  {
    context: 'tokyo',
    latitude: 35.68,
    longitude: 139.69,
    timeZone: 'Asia/Tokyo',
  },
  {
    context: 'sydney',
    latitude: -33.87,
    longitude: 151.21,
    timeZone: 'Australia/Sydney',
  },
];

const toPath = (): string => `/${EXPERIMENTS}/${PATH}`;

export { CLASS_NAME, PATH, PLACES, TICK_MS, toPath };

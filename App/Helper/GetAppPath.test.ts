const DOMAIN = 'http://localhost';
const PATH = 'images/dummy.png';

const getAppPath = jest.fn((path) => `${DOMAIN}/${path}`);

jest.mock('@/Helper/GetAppPath.ts');
jest.mock('@/Helper');
jest.mock('./GetAppPath.ts');

it('returns correctly', () => {
  const path = getAppPath(PATH);

  expect(path).toBe(new URL(`../${PATH}`, DOMAIN).href);
});

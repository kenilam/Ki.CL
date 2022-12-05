const Jest = require('jest');

const MOCK = Object.assign(new URL('https://dummy.org'), {
  ancestorOrigins: '',
  assign: Jest.fn(),
  reload: Jest.fn(),
  replace: Jest.fn(),
});

const mockWindowLocation = (test) => {
  const cached = window.location;

  beforeEach(() => {
    window.location = MOCK;
  });
  afterEach(() => {
    window.location = cached;
  });
};

module.exports = mockWindowLocation;

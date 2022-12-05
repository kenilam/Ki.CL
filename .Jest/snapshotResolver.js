const resolveSnapshotPath = (testPath, snapshotExtension) => {
  return `${testPath}${snapshotExtension}`;
};

const resolveTestPath = (snapshotFilePath, snapshotExtension) => {
  return snapshotFilePath.slice(0, -snapshotExtension.length);
};

module.exports = {
  resolveSnapshotPath,
  resolveTestPath,
  testPathForConsistencyCheck: '<rootDir>/.Jest/testPathForConsistencyCheck.js',
};

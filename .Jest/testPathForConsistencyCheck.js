// Resolve test file path given snapshot file path and extension
// of snapshot files (defaults to .snap)
// turns src/__test__/__snapshot__/Post.spec.ts.snap into
// dist/src/__test__/Post.spec.js
const testPathForConsistencyCheck = (snapshotFilePath, snapshotExtension) => {
  // Transform snapshot file path
  const testSourceFile = snapshotFilePath
    // Remove __snapshot__ directory
    .replace(`/__snapshots__`, '')
    // Convert .ts (TypeScript) to .js to reach built test file
    .replace('.ts', '.js')
    // Remove snapshot extension so we end up with .js
    .replace(snapshotExtension, '');

  // Return test file path in dist directory
  return `dist/${testSourceFile}`;
};

module.exports = testPathForConsistencyCheck;

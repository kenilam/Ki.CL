/**
 * `reset-css` ships no types, and TypeScript 7 rejects side-effect imports of
 * modules it cannot resolve a declaration for (TS2882).
 */
declare module 'reset-css';

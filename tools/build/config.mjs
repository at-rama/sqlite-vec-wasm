// Repository-authored build choices, consumed by execution and reporting.
export const configureOptions = ['--enable-all'];
export const hostOptions = ['CC=cc', 'CC_FOR_BUILD=cc', 'CXX=/bin/false'];
export const targets = ['b-vanilla', 'b-esm', 'b-bundler'];
export const wasmOptions = ['emcc_opt=-Oz'];
export const runtimeNames = [
  'sqlite3.js', 'sqlite3.mjs', 'sqlite3-bundler-friendly.mjs', 'sqlite3.wasm',
  'sqlite3-worker1.js', 'sqlite3-worker1.mjs', 'sqlite3-worker1-bundler-friendly.mjs',
  'sqlite3-worker1-promiser.js', 'sqlite3-worker1-promiser.mjs',
  'sqlite3-worker1-promiser-bundler-friendly.mjs', 'sqlite3-opfs-async-proxy.js',
];

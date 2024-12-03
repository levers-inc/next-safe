import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  // ESM build
  {
    input: 'lib/index.js',
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true
    },
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  },
  // CJS build
  {
    input: 'lib/index.js',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true
    },
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  }
];
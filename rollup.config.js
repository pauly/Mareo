// this plugin allows resolving third-party deps from node_modules. In our case:
// the bs standard library in node_modules/bs-platform
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: './lib/es6/main.js',
  format: 'iife',
  dest: 'docs/all.js',
  plugins: [resolve()]
}

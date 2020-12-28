const {nodeResolve} = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')
const {terser} = require('rollup-plugin-terser')

const suffix = process.env.USE_POLYFILLS == 'on' ? '.polyfilled' : ''

module.exports = {
  input: 'src/index.js',
  output: [
    {
      format: 'amd',
      file: 'dist/basekits.amd' + suffix + '.js'
    },
    {
      format: 'cjs',
      file: 'dist/basekits.cjs' + suffix + '.js'
    },
    {
      format: 'es',
      file: 'dist/basekits.es' + suffix + '.js'
    },
    {
      format: 'iife',
      file: 'dist/basekits.iife' + suffix + '.js',
      name: 'Basekits',
    },
    {
      format: 'umd',
      file: 'dist/basekits.umd' + suffix + '.js',
      name: 'Basekits',
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel(),
    terser()
  ]
}

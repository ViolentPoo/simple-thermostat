import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import postCSS from 'rollup-plugin-postcss'
import postCSSLit from 'rollup-plugin-postcss-lit'
import postCSSPresetEnv from 'postcss-preset-env'
import inject from '@rollup/plugin-inject'
import nodePolyfills from 'rollup-plugin-node-polyfills'

const BUILD_TARGET = process.env.BUILD_TARGET

const shared = (DEBUG) => [
  resolve({
    browser: true,
    preferBuiltins: false
  }),

  commonjs(),

  // Polyfills for Node globals (crypto, buffer, process)
  nodePolyfills(),

  // Single unified inject (fixes CI + removes duplication issues)
  inject({
    global: ['globalThis', 'globalThis'],
    process: 'process',
    Buffer: ['buffer', 'Buffer'],
    crypto: 'crypto',

    // build-time constants
    DEBUG,
    BUILD_TIME: new Date().toLocaleString('en-CA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }),

  json(),

  typescript(),

  postCSS({
    plugins: [
      postCSSPresetEnv({
        stage: 1,
        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
        },
      }),
    ],
    inject: true,
    extract: false,
  }),

  postCSSLit(),
]

const builds = [
  {
    input: 'src/simple-thermostat.ts',
    output: {
      dir: '.',
      entryFileNames: 'simple-thermostat.js',
      format: 'es',
      name: 'SimpleThermostat',
    },
    plugins: [
      ...shared(false),
      terser({
        output: {
          comments: false,
        },
      }),
    ],
  },
  {
    input: 'src/simple-thermostat.ts',
    output: {
      dir: '.',
      entryFileNames: 'simple-thermostat.debug.js',
      format: 'es',
      name: 'SimpleThermostat',
    },
    plugins: shared(true),
  },
]

export default builds.filter(({ output }) => {
  if (BUILD_TARGET === 'prod') {
    return output.entryFileNames === 'simple-thermostat.js'
  }
  if (BUILD_TARGET === 'debug') {
    return output.entryFileNames === 'simple-thermostat.debug.js'
  }
  return true
})

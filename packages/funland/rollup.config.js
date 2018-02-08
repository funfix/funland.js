/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

const babel = require("rollup-plugin-babel")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const path = require("path")

const pkg = require(path.join(process.cwd(), "package.json"))
const { camelCase } = require("lodash")
const sourceMaps = require("rollup-plugin-sourcemaps")

const libraryName = pkg.name

export default {
  input: `dist/index.js`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: "umd" },
    { file: pkg.es5module, format: "es" }
  ],
  sourcemap: true,
  plugins: [
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    resolve(),
    // Don't transpile node_modules. You may change this if you wanna transpile something in there
    babel({
      exclude: "node_modules/**",
      shouldPrintComment: _ => false
    }),
    // Keeps the original source maps
    sourceMaps()
  ]
}

#!/usr/bin/env node
/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

const fs = require("fs")
const path = require("path")

const FILE_PATH = process.argv[2]
if (!FILE_PATH) {
  console.error("ERROR - Missing file argument!")
  process.exit(1)
} else if (path.extname(FILE_PATH) !== ".js") {
  console.error(`ERROR - Given path is not a .js file: ${FILE_PATH}`)
  process.exit(1)
} else if (!fs.existsSync(FILE_PATH)) {
  console.error(`ERROR - Invalid file path: ${FILE_PATH}`)
  process.exit(2)
}

const text = fs.readFileSync(FILE_PATH, "utf-8").replace(
  /(import[\s\S]*?from\s+)(['"])(funlaw[^'"]*)\2/gmi,
  "$1$2$3/dist/es5$2")

fs.writeFileSync(FILE_PATH, text, "utf-8")
console.log(`fix-es5.js: changed ${FILE_PATH}`)

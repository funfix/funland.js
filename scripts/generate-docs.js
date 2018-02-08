#!/usr/bin/env node
/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

const { exec } = require("shelljs")
const fs = require("fs")
const path = require("path")

if (process.argv.length < 3) {
  console.error("Missing directory argument!")
  process.exit(1)
}

const currentDir = process.argv[2]
const packageJsonPath = path.join(currentDir, "package.json")

if (!fs.existsSync(packageJsonPath)) {
  console.error(`Directory does not appear to a valid npm project: ${packageJsonPath} missing!`)
  process.exit(1)
}

process.chdir(currentDir)
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))

if (!fs.existsSync(path.join(currentDir, "rootdoc.md"))) {
  console.info(`No docs to generate for sub-project ${pkg.name}`)
  process.exit(0)
}

exec(`./node_modules/.bin/typedoc --mode file --theme minimal --listInvalidSymbolLinks --excludeNotExported --excludePrivate --out dist/docs --target es6 --name ${pkg.name} --readme rootdoc.md src`)

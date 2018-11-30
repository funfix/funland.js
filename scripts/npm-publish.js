#!/usr/bin/env node
/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

const { cd, exec, echo } = require("shelljs")
const { readFileSync, existsSync } = require("fs")
const fs = require("fs")
const url = require("url")
const path = require("path")

console.info(`CI=${process.env["CI"]}`)
console.info(`TRAVIS_TAG=${process.env["TRAVIS_TAG"]}`)
console.info(`TRAVIS_PULL_REQUEST=${process.env["TRAVIS_PULL_REQUEST"]}`)

if (!process.env["CI"]) {
  console.info("Not running on top of Travis, cannot deploy docs")
  process.exit(1)
}

const branch = process.env["TRAVIS_TAG"]
const m = branch.match(/^v(\d+\.\d+\.\d+)$/)
let version = m && m[1]

if (!version) {
  console.info("Only publishing for version tags, exiting!")
  process.exit(0)
}

console.info(`Version detected: ${version}`)
process.chdir(path.join(path.dirname(process.argv[1]), ".."))

exec(`lerna publish ${version} --no-git-tag-version --no-push --yes --force-publish`)

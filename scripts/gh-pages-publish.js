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
console.info(`TRAVIS_BRANCH=${process.env["TRAVIS_BRANCH"]}`)
console.info(`TRAVIS_TAG=${process.env["TRAVIS_TAG"]}`)
console.info(`TRAVIS_PULL_REQUEST=${process.env["TRAVIS_PULL_REQUEST"]}`)

if (!process.env["CI"]) {
  console.info("Not running on top of Travis, cannot deploy docs")
  process.exit(1)
}

const branch = process.env["TRAVIS_BRANCH"] || process.env["TRAVIS_TAG"]
const m = branch.match(/^v(\d+\.\d+\.\d+)$/)
let version = m && m[1]

if (!version && process.env["TRAVIS_BRANCH"] === "master" && process.env["TRAVIS_PULL_REQUEST"] === 'false') {
  version = 'next'
}

if (!version) {
  console.info("Only deploying docs for version tags, exiting!")
  process.exit(0)
}

console.info(`Version detected: ${version}`)
const commonDir = path.join(path.dirname(process.argv[1]), "..", "common")
const rootDir = path.join(commonDir, "..", "packages")

const repository = "github.com/funfix/funland.git"
const ghToken = process.env.GH_TOKEN

const destDir = path.join(process.env["TMPDIR"] || ".", `docs-${Math.floor(Math.random() * 100000)}`)
const sourceDir = path.resolve(".")

echo("Deploying docs!!!")
if (process.env.TMPDIR && existsSync(process.env.TMPDIR)) {
  cd(`${process.env.TMPDIR}`)
}

exec(`rm -rf "${destDir}"`)
exec(`git clone "https://${ghToken}@${repository}" "${destDir}" -b gh-pages`)

exec(`mkdir -p "${destDir}"/archive/`)
exec(`rm -rf "${destDir}"/archive/${version}`)
exec(`mkdir -p "${destDir}"/archive/${version}`)

for (const p of fs.readdirSync(rootDir)) {
  const dir = path.join(rootDir, p)
  if (!fs.lstatSync(dir).isDirectory()) continue

  const docsDir = path.join(dir, "dist", "docs")
  if (!fs.existsSync(docsDir) || !fs.lstatSync(docsDir).isDirectory()) continue

  const prefixLess = p.replace(/^funland$/i, 'core').replace(/^funland\-/i, '')
  exec(`rm -rf "${destDir}"/archive/${version}/${prefixLess}`)
  exec(`cp -rp "${docsDir}" "${destDir}"/archive/${version}/${prefixLess}`)
}

if (version !== 'next') {
  exec(`rm -rf "${destDir}"/api`)
  exec(`ln -s ./archive/${version} "${destDir}"/api`)
}

cd(destDir)
exec("git add .")
exec('git config user.name "Alexandru Nedelcu"')
exec('git config user.email "noreply@alexn.org"')
exec(`git commit -m "docs(docs): update gh-pages for ${version}"`)
exec(`git push --force --quiet "https://${ghToken}@${repository}" gh-pages:gh-pages`)

cd("~")
exec(`rm -rf ${destDir}`)
echo("Docs deployed!!")

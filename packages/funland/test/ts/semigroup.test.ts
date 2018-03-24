/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as assert from "assert"
import * as types from "../../src"
import { HK } from "../../src"

type Types =
  types.Semigroup<string>

const t: Types = {
  concat: (x, y) => x + y
}

describe("semigroup type tests", () => {
  it("semigroup", () => {
    assert.ok(t.concat("x", "y") === "xy")
  })
})

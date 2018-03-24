/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as jv from "jsverify"
import { semigroupCheck } from "../../test-common"
import { StringSemigroup, NumberSemigroup } from "./semigroup-examples"

describe("Semigroup<string>", () => {
  semigroupCheck(jv.string, StringSemigroup())
})

describe("Semigroup<number>", () => {
  semigroupCheck(jv.number, NumberSemigroup())
})

/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as jv from "jsverify"
import { HK } from "funland"
import { Equiv } from "../../src"
import { applyCheck } from "../../test-common"
import { Box, BoxApply, BoxArbitrary } from "./box"

describe("Apply<Box>", () => {
  const arbBox = BoxArbitrary(jv.number)
  const genFAtoB =
    jv.fun(jv.string).smap(f => new Box(f), box => box.value) as
    jv.Arbitrary<HK<"box", (a: number) => string>>
  const genFBtoC =
    jv.fun(jv.int32).smap(f => new Box(f), box => box.value) as
    jv.Arbitrary<HK<"box", (a: string) => number>>

  applyCheck(
    arbBox as jv.Arbitrary<HK<"box", number>>,
    jv.fun(jv.string),
    jv.fun(jv.int16),
    genFAtoB,
    genFBtoC,
    (eq: Equiv<HK<"box", any>>) => (eq.lh as Box<any>).value === (eq.rh as Box<any>).value,
    new BoxApply)
})

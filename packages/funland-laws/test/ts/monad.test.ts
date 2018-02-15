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
import { monadCheck } from "../../test-common"
import { Box, BoxMonad, BoxArbitrary } from "./box"

describe("Monad<Box>", () => {
  const genFAtoB =
    jv.fun(jv.string).smap(f => new Box(f), box => box.value) as
      jv.Arbitrary<HK<"box", (a: number) => string>>
  const genFBtoC =
    jv.fun(jv.int32).smap(f => new Box(f), box => box.value) as
      jv.Arbitrary<HK<"box", (a: string) => number>>

  monadCheck(
    BoxArbitrary(jv.number) as jv.Arbitrary<HK<"box", number>>,
    BoxArbitrary(jv.string) as jv.Arbitrary<HK<"box", string>>,
    BoxArbitrary(jv.int16) as jv.Arbitrary<HK<"box", number>>,
    jv.fun(jv.string),
    jv.fun(jv.int16),
    genFAtoB,
    genFBtoC,
    jv.int32,
    (eq: Equiv<HK<"box", any>>) => (eq.lh as Box<any>).value === (eq.rh as Box<any>).value,
    new BoxMonad)
})

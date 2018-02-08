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
import { functorCheck } from "../../test-common"
import { Box, BoxArbitrary, BoxFunctor } from "./box"

describe("Functor<Box>", () => {
  functorCheck(
    BoxArbitrary(jv.number) as jv.Arbitrary<HK<"box", number>>,
    jv.fun(jv.string),
    jv.fun(jv.int16),
    (eq: Equiv<HK<"box", any>>) => (eq.lh as Box<any>).value === (eq.rh as Box<any>).value,
    new BoxFunctor)
})

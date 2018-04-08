/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as jv from "jsverify"
import { Ord } from "funland"
import { Equiv, OrdLaws } from "../src"
import { setoidCheck } from "./setoid-tests"

export function ordCheck<A>(
  genA: jv.Arbitrary<A>,
  F: Ord<A>,
  lawsRef?: OrdLaws<A>,
  includeSuperTypes: boolean = true) {

  const laws = lawsRef || new OrdLaws<A>(F)
  if (includeSuperTypes) {
    setoidCheck(genA, F, laws)
  }

  const eq = (p: Equiv<boolean>) => p.lh === p.rh

  jv.property("ord.totality", genA, genA,
    (x, y) => eq(laws.totality(x, y)))

  jv.property("ord.antisymmetry", genA, genA,
    (x, y) => eq(laws.antisymmetry(x, y)))

  jv.property("ord.transitivity", genA, genA, genA,
    (x, y, z) => eq(laws.transitivity2(x, y, z)))
}

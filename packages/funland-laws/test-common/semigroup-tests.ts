/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as jv from "jsverify"
import { Semigroup } from "funland"
import { Equiv, SemigroupLaws } from "../src"

export function semigroupCheck<A>(
  genA: jv.Arbitrary<A>,
  F: Semigroup<A>,
  lawsRef?: SemigroupLaws<A>) {

  const laws = lawsRef || new SemigroupLaws<A>(F)
  const eq = (p: Equiv<A>) => p.lh === p.rh

  jv.property("semigroup.associativity", genA, genA, genA,
    (x, y, z) => eq(laws.associativity(x, y, z)))
}

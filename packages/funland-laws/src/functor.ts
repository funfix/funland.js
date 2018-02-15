/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK, Functor } from "funland"
import { Equiv } from "./equiv"

/**
 * Type-class laws for `Functor`, as defined in the `funland`
 * sub-project and in the `static-land` spec.
 *
 * Laws defined for `Functor`:
 *
 * 1. Identity: `F.map(fa, x => x) <-> fa`
 * 2. Composition: `F.map(fa, x => f(g(x))) <-> F.map(F.map(fa, g), f)`
 */
export class FunctorLaws<F> {
  constructor(public readonly F: Functor<F>) {}

  identity<A>(fa: HK<F, A>): Equiv<HK<F, A>> {
    return Equiv.of(this.F.map(x => x, fa), fa)
  }

  composition<A, B, C>(fa: HK<F, A>, f: (a: B) => C, g: (a: A) => B) {
    const F = this.F
    return Equiv.of(F.map(x => f(g(x)), fa), F.map(f, F.map(g, fa)))
  }
}

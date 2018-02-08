/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK, Apply } from "funland"
import { Equiv } from "./equiv"
import { FunctorLaws } from "./functor"

/**
 * Type-class laws for `Apply`, as defined in the `funland`
 * sub-project and in the `static-land` spec.
 *
 * `Apply` inherits the laws of `Functor` and in addition must obey:
 *
 * 1. Composition:
 *   `F.ap(F.ap(F.map(fbc, f => g => x => f(g(x))), fab), fa) <-> F.ap(fbc, F.ap(fab, fa))`
 */
export class ApplyLaws<F> extends FunctorLaws<F> {
  constructor(public readonly F: Apply<F>) {
    super(F)
  }

  applyComposition<A, B, C>(fa: HK<F, A>, fab: HK<F, (a: A) => B>, fbc: HK<F, (b: B) => C>) {
    const F = this.F
    const compose = (f: (b: B) => C) => (
      (g: (a: A) => B) => (a: A) => f(g(a))
    )

    return Equiv.of(
      F.ap(fbc, F.ap(fab, fa)),
      F.ap(F.ap(F.map(fbc, compose), fab), fa)
    )
  }
}

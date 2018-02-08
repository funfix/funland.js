/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK, Chain } from "funland"
import { Equiv } from "./equiv"
import { ApplyLaws } from "./apply"

/**
 * Type-class laws for `Chain`, as defined in the `funland`
 * sub-project and in the `static-land` spec.
 *
 * `Chain` inherits the laws of `Apply` and in addition must obey:
 *
 * 1. Associativity:
 *   `F.chain(F.chain(fa, f), g) <-> F.chain(fa, a => F.chain(f(a), g))`
 * 2. Apply's `ap` can be derived:
 *    `F.ap = (fab, fa) => F.chain(fab, f => F.map(fa, f))`
 */
export class ChainLaws<F> extends ApplyLaws<F> {
  constructor(public readonly F: Chain<F>) {
    super(F)
  }

  chainAssociativity<A, B, C>(fa: HK<F, A>, f: (a: A) => HK<F, B>, g: (b: B) => HK<F, C>): Equiv<HK<F, C>> {
    const F = this.F
    return Equiv.of(
      F.chain(F.chain(fa, f), g),
      F.chain(fa, a => F.chain(f(a), g))
    )
  }

  chainConsistentApply<A, B>(fa: HK<F, A>, fab: HK<F, (a: A) => B>): Equiv<HK<F, B>> {
    const F = this.F
    return Equiv.of(
      F.ap(fab, fa),
      F.chain(fab, f => F.map(fa, f))
    )
  }
}

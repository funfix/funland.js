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
 * sub-project, mirroring the `static-land` spec.
 *
 * `Chain` inherits the laws of `Apply` and in addition must obey:
 *
 * 1. Associativity:
 *   `F.chain(g, F.chain(f, fa)) <-> F.chain(x => F.chain(g, f(x)), fa)`
 * 2. Apply's `ap` can be derived:
 *    `(ff, fa) => F.chain(f => F.map(f, fa), ff)`
 */
export class ChainLaws<F> extends ApplyLaws<F> {
  constructor(public readonly F: Chain<F>) {
    super(F)
  }

  chainAssociativity<A, B, C>(fa: HK<F, A>, f: (a: A) => HK<F, B>, g: (b: B) => HK<F, C>): Equiv<HK<F, C>> {
    const F = this.F
    return Equiv.of(
      F.chain(g, F.chain(f, fa)),
      F.chain(x => F.chain(g, f(x)), fa)
    )
  }

  chainConsistentApply<A, B>(ff: HK<F, (a: A) => B>, fa: HK<F, A>): Equiv<HK<F, B>> {
    const F = this.F
    return Equiv.of(
      F.ap(ff, fa),
      F.chain(f => F.map(f, fa), ff)
    )
  }
}

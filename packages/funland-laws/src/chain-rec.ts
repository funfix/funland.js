/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK, ChainRec } from "funland"
import { Equiv } from "./equiv"
import { ChainLaws } from "./chain"

/**
 * Type-class laws for `ChainRec`, as defined in the `funland`
 * sub-project, mirroring the `static-land` spec.
 *
 * `ChainRec` inherits the laws of `Chain` and in addition must have:
 *
 * 1. Equivalence with `chain`
 * 2. Constant memory usage
 */
export class ChainRecLaws<F> extends ChainLaws<F> {
  constructor(
    public readonly F: ChainRec<F>) {
    super(F)
  }

  chainRecConsistency<A>(a: A, f: (a: A) => HK<F, A>): Equiv<HK<F, A>> {
    const F = this.F
    const bounce = (n: number): HK<F, A> => F.chainRec(
      (next, done, x) => {
        const [a0, i] = x
        return i > 0
          ? F.map(a1 => next([a1, i - 1] as [A, number]), f(a0))
          : F.map(done, f(a0))
      },
      [a, n] as [A, number]
    )

    /*
     * The law is for n >= 1
     * bounce(n) == bounce(n - 1).flatMap(f)
     *
     * Many monads blow up if n gets too large here (for instance List, becomes
     * multiplicative, so the memory is exponential in n).
     */
    return Equiv.of(bounce(1), F.chain(f, bounce(0)))
  }
}

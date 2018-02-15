/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK, Applicative } from "funland"
import { Equiv } from "./equiv"
import { ApplyLaws } from "./apply"

/**
 * Type-class laws for `Apply`, as defined in the `funland`
 * sub-project and in the `static-land` spec.
 *
 * `Applicative` inherits the laws of `Apply` and in addition must obey:
 *
 * 1. Identity: `A.ap(A.of(x => x), v) <-> v`
 * 2. Homomorphism: `A.ap(A.of(f), A.of(x)) <-> A.of(f(x))`
 * 3. Interchange: A.ap(u, A.of(y)) <-> A.ap(A.of(f => f(y)), u)
 * 4. Functor's `map` can be derived: `A.map(u, f) <-> A.ap(A.of(f), u)`
 */
export class ApplicativeLaws<F> extends ApplyLaws<F> {
  constructor(public readonly F: Applicative<F>) {
    super(F)
  }

  applicativeIdentity<A>(fa: HK<F, A>): Equiv<HK<F, A>> {
    const F = this.F
    return Equiv.of(
      F.ap(F.of((a: A) => a), fa),
      fa
    )
  }

  applicativeHomomorphism<A, B>(a: A, f: (a: A) => B): Equiv<HK<F, B>> {
    const F = this.F
    return Equiv.of(
      F.ap(F.of(f), F.of(a)),
      F.of(f(a))
    )
  }

  applicativeInterchange<A, B>(a: A, ff: HK<F, (a: A) => B>): Equiv<HK<F, B>> {
    const F = this.F
    return Equiv.of(
      F.ap(ff, F.of(a)),
      F.ap(F.of((f: (a: A) => B) => f(a)), ff)
    )
  }

  applicativeMap<A, B>(fa: HK<F, A>, f: (a: A) => B): Equiv<HK<F, B>> {
    const F = this.F
    return Equiv.of(
      F.map(f, fa),
      F.ap(F.of(f), fa)
    )
  }
}

/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK, Monad } from "funland"
import { Equiv } from "./equiv"
import { ApplicativeLaws } from "./applicative"
import { ChainRecLaws } from "./chain-rec"

/**
 * Type-class laws for `Monad`, as defined in the `funland`
 * sub-project, mirroring the `static-land` spec.
 *
 * `Monad` inherits the laws of `Applicative` and of `Chain` and
 * in addition must obey:
 *
 * 1. Left identity: `M.chain(f, M.of(a)) <-> f(a)`
 * 2. Right identity: `M.chain(M.of, u) <-> u`
 * 3. Functor's `map` can be derived:
 *    `A.map = (f, u) => A.chain(x => A.of(f(x)), u)`
 */
export class MonadLaws<F> extends ApplicativeLaws<F> implements ChainRecLaws<F> {
  constructor(public readonly F: Monad<F>) {
    super(F)
  }

  monadLeftIdentity<A, B>(a: A, f: (a: A) => HK<F, B>): Equiv<HK<F, B>> {
    const F = this.F
    return Equiv.of(F.chain(f, F.of(a)), f(a))
  }

  monadRightIdentity<A, B>(fa: HK<F, A>): Equiv<HK<F, A>> {
    const F = this.F
    return Equiv.of(F.chain(a => F.of(a), fa), fa)
  }

  monadMap<A, B>(fa: HK<F, A>, f: (a: A) => B): Equiv<HK<F, B>> {
    const F = this.F
    return Equiv.of(F.chain(a => F.of(f(a)), fa), F.map(f, fa))
  }

  monadChainRecStackSafety(): Equiv<HK<F, number>> {
    const F = this.F
    const n = 10000
    const res: HK<F, number> = F.chainRec((next, done, i) => F.of(i < n ? next(i + 1) : done(i)), 0)
    return Equiv.of(res, F.of(n))
  }

  // Mixed-in from ChainLaws
  chainAssociativity<A, B, C>(fa: HK<F, A>, f: (a: A) => HK<F, B>, g: (b: B) => HK<F, C>): Equiv<HK<F, C>> {
    return ChainRecLaws.prototype.chainAssociativity.call(this, fa as any, f as any, g as any) as any
  }
  // Mixed-in from ChainLaws
  chainConsistentApply<A, B>(ff: HK<F, (a: A) => B>, fa: HK<F, A>): Equiv<HK<F, B>> {
    return ChainRecLaws.prototype.chainConsistentApply.call(this, ff as any, fa as any) as any
  }
  // Mixed-in from ChainRecLaws
  chainRecConsistency<A>(a: A, f: (a: A) => HK<F, A>): Equiv<HK<F, A>> {
    return ChainRecLaws.prototype.chainRecConsistency.call(this, a as any, f as any) as any
  }
}

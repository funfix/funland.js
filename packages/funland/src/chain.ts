/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK } from "./kinds"
import { Apply } from "./apply"

/**
 * The `Chain` type class is a lightweight {@link Monad}.
 *
 * It exposes [chain]{@link Chain.chain}, which allows to have a
 * value in a context (`F<A>`) and then feed that into a function that
 * takes a normal value and returns a value in a context
 * (`A => F<B>`).
 *
 * One motivation for separating this out from `Monad` is that there are
 * situations where we can implement `chain` but not `of`. For example,
 * we can implement `map` or `chain` that transforms the values of a
 * `Map<K, ?>` type, but we can't implement `of` (because we wouldn't
 * know what key to use when instantiating the new `Map`).
 *
 * In addition to `Apply`'s laws, `Chain` instances must obey these laws:
 *
 * 1. Associativity: `M.chain(M.chain(u, f), g) <-> M.chain(u, x => M.chain(f(x), g))`
 * 2. Apply's `ap` can be derived:
 *    `A.ap = (uf, ux) => A.chain(uf, f => A.map(f, ux))`
 *
 * Equivalent with the `Chain` and `ChainRec` type classes in the
 * [Fantasy-Land](https://github.com/fantasyland/fantasy-land) specification.
 */
export interface Chain<F> extends Apply<F> {
  chain<A, B>(fa: HK<F, A>, f: (a: A) => HK<F, B>): HK<F, B>

  /**
   * Keeps calling `f` until a `done(b)` is returned.
   *
   * Based on Phil Freeman's
   * [Stack Safety for Free]{@link http://functorial.com/stack-safety-for-free/index.pdf}.
   *
   * Implementations of this function should use constant stack space
   * relative to `f`.
   */
  chainRec<A, B>(a: A, f: <C>(next: (a: A) => C, done: (b: B) => C, a: A) => HK<F, C>): HK<F, B>
}

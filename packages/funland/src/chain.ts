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
 * The `Chain` type-class is a lightweight {@link Monad}.
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
 * 1. Associativity:
 *   `F.chain(g, F.chain(f, fa)) <-> F.chain(x => F.chain(g, f(x)), fa)`
 * 2. Apply's `ap` can be derived:
 *    `(ff, fa) => F.chain(f => F.map(f, fa), ff)`
 *
 * Equivalent with the `Chain` type-class in the
 * [static-land](https://github.com/rpominov/static-land/)
 * specification.
 */
export interface Chain<F> extends Apply<F> {
  chain<A, B>(f: (a: A) => HK<F, B>, fa: HK<F, A>): HK<F, B>
}

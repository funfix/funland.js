/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK } from "./kinds"
import { Functor } from "./functor"

/**
 * Weaker version of {@link Applicative}.
 *
 * This type-class is exposed in addition to `Applicative` because
 * there are data types for which we can't implement `of`, but
 * that could still benefit from an `ap` definition. For example
 * in case of a `Map<K, ?>` we couldn't define `pure` for it
 * because we don't have a `K` key.
 *
 * Must obey this law:
 *
 * 1. Composition: `A.ap(A.ap(A.map(f => g => x => f(g(x)), a), u), v) <-> A.ap(a, A.ap(u, v))`
 *
 * Equivalent with the `Apply` type-class in the
 * [static-land](https://github.com/rpominov/static-land/)
 * specification.
 */
export interface Apply<F> extends Functor<F> {
  ap<A, B>(ff: HK<F, (a: A) => B>, fa: HK<F, A>): HK<F, B>
}

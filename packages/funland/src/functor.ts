/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK } from "./kinds"

/**
 * The `Functor` is a type-class providing the `map` operation that
 * allows lifting an `f` function into the functor context and
 * applying it.
 *
 * Instances must obey these laws:
 *
 * 1. Identity: `F.map(x => x, a) <-> a`
 * 2. Composition: `F.map(x => f(g(x)), a) <-> F.map(f, F.map(g, a))`
 *
 * Equivalent with the `Functor` type-class in the
 * [Fantasy-Land](https://github.com/fantasyland/fantasy-land) and
 * [static-land](https://github.com/rpominov/static-land/)
 * specifications.
 */
export interface Functor<F> {
  map<A, B>(f: (a: A) => B, fa: HK<F, A>): HK<F, B>
}

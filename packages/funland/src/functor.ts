/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK } from "./kinds"

/**
 * The `Functor` is a type class providing the `map` operation that
 * allows lifting an `f` function into the functor context and
 * applying it.
 *
 * Instances must obey these laws:
 *
 * 1. Identity: `F.map(fa, x => x) <-> fa`
 * 2. Composition: `F.map(fa, x => f(g(x))) <-> F.map(F.map(fa, g), f)`
 *
 * Equivalent with the `Functor` type class in the
 * [Fantasy-Land](https://github.com/fantasyland/fantasy-land) specification.
 */
export interface Functor<F> {
  map<A, B>(fa: HK<F, A>, f: (a: A) => B): HK<F, B>
}

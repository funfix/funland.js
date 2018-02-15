/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK } from "./kinds"
import { Chain } from "./chain"

/**
 * The `ChainRec` is a type-class that matches the `Chain` algebra
 * and in addition specifies `chainRec`.
 *
 * Based on Phil Freeman's
 * [[http://functorial.com/stack-safety-for-free/index.pdf Stack Safety for Free]].
 *
 * Equivalent with the `ChainRec` type-class in the
 * [static-land](https://github.com/rpominov/static-land/)
 * specification.
 */
export interface ChainRec<F> extends Chain<F> {
  chainRec<A, B>(f: <C>(next: (a: A) => C, done: (b: B) => C, a: A) => HK<F, C>, a: A): HK<F, B>
}

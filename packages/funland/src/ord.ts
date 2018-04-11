/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { Setoid } from "./setoid"

/**
 * The `Ord` type defines total ordering.
 *
 * Inspired by [Data.Ord](https://hackage.haskell.org/package/base/docs/Data-Ord.html)
 * from Haskell.
 *
 * Instances must obey the following laws:
 *
 * 1. Totality: `S.lte(a, b)` or `S.lte(b, a)`
 * 2. Antisymmetry: if `S.lte(a, b)` and `S.lte(b, a)`, then `S.equals(a, b)`
 * 3. Transitivity: if `S.lte(a, b)` and `S.lte(b, c)`, then `S.lte(a, c)`
 *
 * Equivalent with the `Ord` type-class in the
 * [static-land]{@link https://github.com/rpominov/static-land/} spec.
 */
export interface Ord<A> extends Setoid<A> {
  lte(a: A, b: A): boolean
}

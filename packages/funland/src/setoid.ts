/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * The `Setoid` type defines equality.
 *
 * Inspired by [Data.Eq](https://hackage.haskell.org/package/base/docs/Data-Eq.html)
 * from Haskell.
 *
 * Instances must obey the following laws:
 *
 * 1. Reflexivity: `S.equals(a, a) === true`
 * 2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
 * 3. Transitivity: if `S.equals(a, b)` and `S.equals(b, c)`, then `S.equals(a, c)`
 *
 * Equivalent with the `Setoid` type-class in the
 * [static-land]{@link https://github.com/rpominov/static-land/} spec.
 */
export interface Setoid<A> {
  equals(x: A, y: A): boolean
}

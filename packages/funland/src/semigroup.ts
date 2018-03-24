/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * The `Semigroup` type defines equality.
 *
 * Inspired by [Data.Semigroup](https://hackage.haskell.org/package/base/docs/Data-Semigroup.html)
 * from Haskell.
 *
 * Instances must obey the following laws:
 *
 * 1. Associativity: Associativity: S.concat(S.concat(a, b), c) ≡ S.concat(a, S.concat(b, c))
 *
 * Equivalent with the `Semigroup` type-class in the
 * [static-land]{@link https://github.com/rpominov/static-land/} spec.
 */
export interface Semigroup<A> {
  concat(x: A, y: A): A
}

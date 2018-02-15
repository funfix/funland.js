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
 * `Applicative` functor type-class.
 *
 * Allows application of a function in an Applicative context to a
 * value in an `Applicative` context.
 *
 * This structure is an intermediate between a functor and a monad
 * (technically, a strong lax monoidal functor). Compared with monads,
 * this interface lacks the full power of the binding operation (`chain`),
 * but it has more instances and it is sufficient for many uses.
 *
 * References:
 *
 * - [The Essence of the Iterator Pattern]{@link https://www.cs.ox.ac.uk/jeremy.gibbons/publications/iterator.pdf}
 * - [Applicative programming with effects]{@link http://staff.city.ac.uk/~ross/papers/Applicative.pdf}
 *
 * Note that having an `Applicative` instance implies {@link Functor} and
 * {@link Apply} implementations are also available, which is why the
 * `Applicative` interface is a subtype of `Functor` and `Apply`.
 *
 * `Applicative` implementations must obey the following laws:
 *
 * 1. Identity: `A.ap(A.of(x => x), v) <-> v`
 * 2. Homomorphism: `A.ap(A.of(f), A.of(x)) <-> A.of(f(x))`
 * 3. Interchange: A.ap(u, A.of(y)) <-> A.ap(A.of(f => f(y)), u)
 * 4. Functor's `map` (can be derived): `A.map(f, u) <-> A.ap(A.of(f), u)`
 *
 * Equivalent with the `Chain` type-class in the
 * [static-land](https://github.com/rpominov/static-land/)
 * specification.
 */
export interface Applicative<F> extends Apply<F> {
  of<A>(a: A): HK<F, A>
}

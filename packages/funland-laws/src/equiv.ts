/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * Data type for expressing equivalence in type class laws.
 *
 * All laws expressed by this sub-project are expressed in
 * terms of such equivalences.
 *
 * An `Equiv` represents a sentence whose truthiness remains
 * to be proved in testing:
 *
 * ```
 * Equiv.of(a, b) <-> a is equivalent to b
 * ```
 *
 * Note equivalence may or may not imply equality. Some types
 * cannot declare an equality operation (e.g. functions, or
 * `Promise` because it needs asynchronous execution). Equivalence
 * simply means that the left hand value can always be substituted
 * by the right hand value and vice versa, without changing the
 * output of the program (see referential transparency).
 *
 * @final
 */
export class Equiv<A> {
  private constructor(
    public readonly lh: A,
    public readonly rh: A) {}

  static of<A>(lh: A, rh: A): Equiv<A> {
    return new Equiv(lh, rh)
  }
}

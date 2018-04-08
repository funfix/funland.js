/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { Ord } from "funland"
import { Equiv } from "./equiv"
import { SetoidLaws } from "./setoid"

/**
 * Type-class laws for `Ord`, as defined in the `funland`
 * sub-project and in the `static-land` spec.
 *
 * Laws defined for `Ord`:
 *
 * 1. Totality: `S.lte(a, b)` or `S.lte(b, a)`
 * 2. Antisymmetry: if `S.lte(a, b)` and `S.lte(b, a)`, then `S.equals(a, b)`
 * 3. Transitivity: if `S.lte(a, b)` and `S.lte(b, c)`, then `S.lte(a, c)`
 */
export class OrdLaws<A> extends SetoidLaws<A> {
  constructor(public readonly F: Ord<A>) {
    super(F)
  }

  totality(x: A, y: A): Equiv<boolean> {
    return Equiv.of(
      this.F.lte(x, y) || this.F.lte(y, x),
      true)
  }

  antisymmetry(x: A, y: A): Equiv<boolean> {
    return Equiv.of(
      this.F.lte(x, y) && this.F.lte(y, x),
      this.F.equals(x, y))
  }

  transitivity2(x: A, y: A, z: A): Equiv<boolean> {
    return Equiv.of(
      this.F.lte(x, y) && this.F.lte(y, z),
      this.F.lte(x, y) && this.F.lte(x, z))
  }
}

/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { Setoid } from "funland"
import { Equiv } from "./equiv"

/**
 * Type-class laws for `Setoid`, as defined in the `funland`
 * sub-project and in the `static-land` spec.
 *
 * Laws defined for `Setoid`:
 *
 * 1. Reflexivity: `S.equals(a, a) === true`
 * 2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
 * 3. Transitivity: if `S.equals(a, b)` and `S.equals(b, c)`, then `S.equals(a, c)`
 */
export class SetoidLaws<A> {
  constructor(public readonly F: Setoid<A>) {}

  reflexivity(a: A): Equiv<boolean> {
    return Equiv.of(this.F.equals(a, a), true)
  }

  symmetry(x: A, y: A): Equiv<boolean> {
    return Equiv.of(this.F.equals(x, y), this.F.equals(y, x))
  }

  transitivity(x: A, y: A, z: A): Equiv<boolean> {
    return Equiv.of(
      this.F.equals(x, y) && this.F.equals(y, z),
      this.F.equals(x, y) && this.F.equals(x, z))
  }
}

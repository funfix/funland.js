/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { Semigroup } from "funland"
import { Equiv } from "./equiv"

/**
 * Type-class laws for `Semigroup`, as defined in the `funland`
 * sub-project and in the `static-land` spec.
 *
 * Laws defined for `Semigroup`:
 *
 * 1. Associativity: Associativity: S.concat(S.concat(a, b), c) ≡ S.concat(a, S.concat(b, c))
 */
export class SemigroupLaws<A> {
  constructor(public readonly F: Semigroup<A>) {}

  associativity(x: A, y: A, z: A): Equiv<boolean> {
    return Equiv.of(
      this.F.concat(this.F.concat(x, y), z),
      this.F.concat(x, this.F.concat(y, z)))
  }
}

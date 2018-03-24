/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as jv from "jsverify"
import {
  Semigroup
} from "funland"

export function StringSemigroup(): Semigroup<string> {
  return {
    concat: (x: string, y: string): string => x + y
  }
}

export function NumberSemigroup(): Semigroup<number> {
  return {
    concat: (x: number, y: number): number => x + y
  }
}

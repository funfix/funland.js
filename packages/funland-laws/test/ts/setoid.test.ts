/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as jv from "jsverify"
import { setoidCheck } from "../../test-common"
import { BoxArbitrary, BoxSetoid } from "./box"

describe("Setoid<Box>", () => {
  setoidCheck(BoxArbitrary(jv.number), BoxSetoid())
})

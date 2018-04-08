/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as jv from "jsverify"
import { ordCheck } from "../../test-common"
import { BoxArbitrary, BoxOrd } from "./box"

describe("Ord<Box>", () => {
  ordCheck(BoxArbitrary(jv.number), new BoxOrd)
})

/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { Applicative } from "./applicative"
import { Chain } from "./chain"

/**
 * The `Monad` type class.
 *
 * Allows composition of dependent effectful functions.
 *
 * This type-class must support the `Applicative` and `Chain`
 * algebras and obey the following laws:
 *
 * 1. Left identity: `M.chain(f, M.of(a)) <-> f(a)`
 * 2. Right identity: `M.chain(M.of, u) <-> u`
 * 3. Functor's `map` can be derived:
 *    `A.map = (f, u) => A.chain(x => A.of(f(x)), u)`
 *
 * See [Monads for functional programming]{@link http://homepages.inf.ed.ac.uk/wadler/papers/marktoberdorf/baastad.pdf},
 * by Philip Wadler.
 *
 * Equivalent with the `Monad` type-class in the
 * [Fantasy-Land](https://github.com/fantasyland/fantasy-land) and
 * [static-land](https://github.com/rpominov/static-land/)
 * specifications.
 */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

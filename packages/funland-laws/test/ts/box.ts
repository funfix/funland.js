/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { HK, Setoid, Functor, Apply, Applicative } from "funland"
import * as jv from "jsverify"
import {Chain} from "funland/dist/chain";

export class Box<A> implements HK<"box", A> {
  readonly _URI: "box"
  readonly _A: A
  constructor(public readonly value: A) {}
}

export function BoxSetoid<A>(): Setoid<Box<A>> {
  return {
    equals: (x: Box<A>, y: Box<A>) => x.value === y.value
  }
}

export function BoxArbitrary<A>(arb: jv.Arbitrary<A>): jv.Arbitrary<Box<A>> {
  return arb.smap(
    i => new Box(i),
    b => b.value
  )
}

export class BoxFunctor implements Functor<"box"> {
  map<A, B>(fa: HK<"box", A>, f: (a: A) => B) {
    return new Box(f((fa as Box<A>).value))
  }
}

export class BoxApply extends BoxFunctor implements Apply<"box"> {
  ap<A, B>(ff: HK<"box", (a: A) => B>, fa: HK<"box", A>): HK<"box", B> {
    const f = (ff as Box<(a: A) => B>).value
    const a = (fa as Box<A>).value
    return new Box(f(a))
  }
}

export class BoxApplicative extends BoxApply implements Applicative<"box"> {
  of<A>(a: A) { return new Box(a) }
}

export class BoxChain extends BoxApply implements Chain<"box"> {
  chain<A, B>(fa: HK<"box", A>, f: (a: A) => HK<"box", B>) {
    return f((fa as Box<A>).value)
  }
}

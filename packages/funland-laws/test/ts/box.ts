/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as jv from "jsverify"
import {
  HK,
  Setoid,
  Ord,
  Functor,
  Apply,
  Applicative,
  Chain,
  ChainRec,
  Monad
} from "funland"

export class Box<A> implements HK<"box", A> {
  readonly _URI!: "box"
  readonly _A!: A
  constructor(public readonly value: A) {}
}

export type Either<L, R> = Left<L> | Right<R>
export type Left<L> = { tag: "left", value: L }
export type Right<R> = { tag: "right", value: R }

export function left<L, R>(value: L): Either<L, R> {
  return { tag: "left", value }
}

export function right<L, R>(value: R): Either<L, R> {
  return { tag: "right", value }
}

export class BoxSetoid<A> implements Setoid<Box<A>> {
  equals(x: Box<A>, y: Box<A>) {
    return x.value === y.value
  }
}

export class BoxOrd<A> extends BoxSetoid<A> implements Ord<Box<A>> {
  lte(x: Box<A>, y: Box<A>) {
    return x.value <= y.value
  }
}

export function BoxArbitrary<A>(arb: jv.Arbitrary<A>): jv.Arbitrary<Box<A>> {
  return arb.smap(
    i => new Box(i),
    b => b.value
  )
}

export class BoxFunctor implements Functor<"box"> {
  map<A, B>(f: (a: A) => B, fa: HK<"box", A>) {
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
  chain<A, B>(f: (a: A) => HK<"box", B>, fa: HK<"box", A>) {
    return f((fa as Box<A>).value)
  }
}

export class BoxChainRec extends BoxChain implements ChainRec<"box"> {
  chainRec<A, B>(
    f: (next: (a: A) => Either<A, B>, done: (b: B) => Either<A, B>, a: A) => HK<"box", Either<A, B>>,
    a: A) {

    let cursor: Either<A, B> = left(a)
    while (cursor.tag === "left") {
      cursor = (f(left, right, cursor.value) as Box<Either<A, B>>).value
    }
    return new Box(cursor.value)
  }
}

export class BoxMonad extends BoxChainRec implements Monad<"box"> {
  of<A>(a: A) { return new Box(a) }
}

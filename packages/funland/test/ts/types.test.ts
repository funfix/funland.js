/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import * as assert from "assert"
import * as types from "../../src"
import { HK } from "../../src"

class Box<A> implements HK<"box", A> {
  readonly _URI: "box"
  readonly _A: A
  constructor(public readonly value: A) {}
}

type Either<L, R> = Left<L> | Right<R>
type Left<L> = { tag: "left", value: L }
type Right<R> = { tag: "right", value: R }

type Types =
  types.Setoid<Box<any>> &
  types.Functor<"box"> &
  types.Apply<"box"> &
  types.Applicative<"box"> &
  types.Chain<"box"> &
  types.ChainRec<"box"> &
  types.Monad<"box">

function left<L, R>(value: L): Either<L, R> {
  return { tag: "left", value }
}

function right<L, R>(value: R): Either<L, R> {
  return { tag: "right", value }
}

const t: Types = {
  equals: (x, y) =>
    (x as Box<any>).value === (y as Box<any>).value,
  map: <A, B>(f: (a: A) => B, fa: HK<"box", A>) =>
    new Box(f((fa as Box<A>).value)),
  ap: <A, B>(ff: HK<"box", (a: A) => B>, fa: HK<"box", A>) => {
    const f = (ff as Box<(a: A) => B>).value
    const a = (fa as Box<A>).value
    return new Box(f(a))
  },
  of<A>(a: A) {
    return new Box(a)
  },
  chain<A, B>(f: (a: A) => HK<"box", B>, fa: HK<"box", A>) {
    return f((fa as Box<A>).value)
  },
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

describe("type tests", () => {
  it("setoid", () => {
    // Dummy test meant to prevent errors due to this project not
    // exposing any actual executable code
    assert.ok(t.equals(new Box(1), new Box(1)))
    assert.ok(!t.equals(new Box(1), new Box(2)))
  })

  it("functor", () => {
    const fb = t.map(x => x + 1, new Box(1))
    assert.equal((fb as Box<number>).value, 2)
  })

  it("apply", () => {
    const fb = t.ap(new Box((a: number) => a + 1), new Box(1))
    assert.equal((fb as Box<number>).value, 2)
  })

  it("applicative", () => {
    const fb = t.ap(new Box((a: number) => a + 1), t.of(1))
    assert.equal((fb as Box<number>).value, 2)
  })

  it("chain", () => {
    const fb = t.chain(a => new Box(a + 1), new Box(1))
    assert.equal((fb as Box<number>).value, 2)
  })

  it("chainRec", () => {
    const fb = t.chainRec(
      (next, done, a) => {
        return new Box(a < 10 ? next(a + 1) : done(a))
      },
      0)

    assert.equal((fb as Box<number>).value, 10)
  })
})

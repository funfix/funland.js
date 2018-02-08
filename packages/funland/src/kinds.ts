/*!
 * Copyright (c) 2018 by The Funland Project Developers.
 * Some rights reserved.
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

/**
 * Given a type `T` representing instances of a class `C`, the type
 * `Constructor<T>` is the type of the class `C`.
 *
 * This type emulates
 * [Class<T> from Flow]{@link https://flow.org/en/docs/types/utilities/#classt-a-classtoc-idtoc-class-hreftoc-classa}.
 *
 * Note that in TypeScript constructors can also be `protected` or `private`
 * and unfortunately specifying `{ new(): T }` is thus insufficient.
 * Which is why, for classes without a public constructor, we have to
 * specify a `_funErasure` (static) member as a property, to help the compiler
 * infer type `T`.
 *
 * Example:
 *
 * ```typescript
 * class NumBox { constructor(public num: number) {} }
 * class GenBox<A> { constructor(public a: A) {} }
 *
 * function getDefault<F>(ref: Constructor<F>): Option<F> {
 *   if ((ref as any)._default) return Some(ref._default)
 *   return None
 * }
 *
 * (NumBox as any)._default = new NumBox(10)
 * (GenBox as any)._default = new GenBox("value")
 *
 * const r1: Option<NumBox> = getDefault(NumBox)
 * const r2: Option<GenBox<any>> = getDefault(GenBox)
 * ```
 *
 * And for classes with a private constructor:
 *
 * ```typescript
 * class PrivateBox<A> {
 *   private constructor(public a: A) {}
 *
 *   static _funErasure: PrivateBox<any> // leaving undefined
 * }
 *
 * const F = PrivateBox as any
 * F._default = new F("hello")
 *
 * const r: Option<PrivateBox<any>> = getDefault(NumBox)
 * ```
 */
export type Constructor<T> =
  { new(...args: any[]): T } | { readonly _Class: T }

/**
 * Lightweight encoding for higher kinded types.
 *
 * Inspired by the
 * [Lightweight higher-kinded polymorphism]{@link https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf}
 * paper.
 *
 * Built to be compatible with other projects in the ecosystem.
 */
export interface HK<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

/**
 * Lightweight encoding for higher kinded types, the version for data
 * types with two type parameters.
 *
 * See {@link HK} and {@link HK3}.
 */
export interface HK2<URI, L, A> extends HK<URI, A> {
  readonly _L: L
}

/**
 * Lightweight encoding for higher kinded types, the version for data
 * types with two type parameters.
 *
 * See {@link HK} and {@link HK2}.
 */
export interface HK3<URI, U, L, A> extends HK2<URI, L, A> {
  readonly _U: U
}

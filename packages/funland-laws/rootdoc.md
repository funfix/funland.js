# funland-laws

[Funland](https://funland-js.org) is a specification of common algebraic structures for JavaScript, 
[TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/),
based on [Fantasy Land](https://github.com/fantasyland/fantasy-land)
and compatible with [static-land](https://github.com/rpominov/static-land).

`funland-laws` is a sub-project of [Funland](https://funland-js.org)
exposing type-class laws for usage in tests.

## Usage

For the TypeScript / Flow types, which are very light 
(no accompanying JavaScript code, just types):

```
npm install --save funland
```

For the laws:

```
npm install --save funland-laws
```

Usage of laws mostly makes sense in tests, being built for property-based
testing, so usage of [jsverify](https://github.com/jsverify/jsverify) is
recommended, but not required.

### Documentation

API docs:

- [funland](https://funland-js.org/api/core/) (core)
- [funland-laws](https://funland-js.org/api/laws/) (laws)

Exposed type classes:

- `Setoid` ([api](../core/interfaces/setoid.html) / [laws](./classes/setoidlaws.html) / [static-land](https://github.com/rpominov/static-land/blob/v1.0.0/docs/spec.md#setoid))
- `Functor` ([api](../core/interfaces/functor.html) / [laws](./classes/functorlaws.html) / [static-land](https://github.com/rpominov/static-land/blob/v1.0.0/docs/spec.md#functor))
- `Apply` ([api](../core/interfaces/apply.html) / [laws](./classes/applylaws.html) / [static-land](https://github.com/rpominov/static-land/blob/v1.0.0/docs/spec.md#apply))
- `Applicative` ([api](../core/interfaces/applicative.html) / [laws](./classes/applicativelaws.html) / [static-land](https://github.com/rpominov/static-land/blob/v1.0.0/docs/spec.md#applicative))
- `Chain` ([api](../core/interfaces/chain.html) / [laws](./classes/chainlaws.html) / [static-land](https://github.com/rpominov/static-land/blob/v1.0.0/docs/spec.md#chain))
- `ChainRec` ([api](../core/interfaces/chainrec.html) / [laws](./classes/chainreclaws.html) / [static-land](https://github.com/rpominov/static-land/blob/v1.0.0/docs/spec.md#chainrec))
- `Monad` ([api](../core/interfaces/monad.html) / [laws](./classes/monadlaws.html) / [static-land](https://github.com/rpominov/static-land/blob/v1.0.0/docs/spec.md#monad))

### Testing the Included Type-class Laws

The included laws are meant for usage with property-based testing,
so you'll need something like [jsverify](https://github.com/jsverify/jsverify)
as a dependency.

```
npm install funland-laws --save-dev

npm install jsverify --save-dev

# For jsverify types (for TypeScript):
npm install @types/jsverify --save-dev
```

And then you can do something like this:

```typescript
import * as jv from "jsverify"
import { Setoid } from "funland"
import { Equiv, SetoidLaws } from "funland-laws"

export function setoidCheck<A>(
  genA: jv.Arbitrary<A>,
  F: Setoid<A>,
  lawsRef?: SetoidLaws<A>) {

  const laws = lawsRef || new SetoidLaws<A>(F)
  const eq = (p: Equiv<boolean>) => p.lh === p.rh

  jv.property("setoid.reflexivity", genA,
    x => eq(laws.reflexivity(x)))

  jv.property("setoid.symmetry", genA, genA,
    (x, y) => eq(laws.symmetry(x, y)))

  jv.property("setoid.transitivity", genA, genA, genA,
    (x, y, z) => eq(laws.transitivity(x, y, z)))
}
```

Such integration is currently not provided by Funland, however the 
project's repository has code to use for inspiration, see
[github.com/.../funland-laws/test-common](https://github.com/funfix/funland/tree/master/packages/funland-laws/test-common).

### Modules: UMD and ES 2015

The library has been compiled using
[UMD (Universal Module Definition)](https://github.com/umdjs/umd),
so it should work with [CommonJS](http://requirejs.org/docs/commonjs.html)
and [AMD](http://requirejs.org/docs/whyamd.html), for standalone usage
in browsers or Node.js.

But it also provides a `module` definition in `package.json`, thus
providing compatibility with
[ECMAScript 2015 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import),
for usage when used with a modern JS engine, or when bundling with a
tool chain that understands ES2015 modules,
like [Rollup](https://rollupjs.org/)
or [Webpack](https://webpack.js.org/).

## TypeScript or Flow?

Funland exposes both [TypeScript](https://www.typescriptlang.org/)
and [Flow](https://flow.org/) type annotations out of the box.

## License

All code in this repository is licensed under the MIT license.  

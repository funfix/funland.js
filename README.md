# Funland

> [!WARNING]  
> This repository has been unmaintained and is now ARCHIVED.

Funland is a specification of common algebraic structures for JavaScript,
[TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/),
based on [Fantasy Land](https://github.com/fantasyland/fantasy-land)
and compatible with [static-land](https://github.com/rpominov/static-land).

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

- [funland](https://funland.funfix.org/api/core/) (core)
- [funland-laws](https://funland.funfix.org/api/laws/) (laws)

Exposed type classes:

- `Setoid` ([api](https://funland.funfix.org/api/core/interfaces/setoid.html) / [laws](https://funland.funfix.org/api/laws/classes/setoidlaws.html) / [static-land](https://github.com/rpominov/static-land/blob/master/docs/spec.md#setoid))
- `Functor` ([api](https://funland.funfix.org/api/core/interfaces/functor.html) / [laws](https://funland.funfix.org/api/laws/classes/functorlaws.html) / [static-land](https://github.com/rpominov/static-land/blob/master/docs/spec.md#functor))
- `Apply` ([api](https://funland.funfix.org/api/core/interfaces/apply.html) / [laws](https://funland.funfix.org/api/laws/classes/applylaws.html) / [static-land](https://github.com/rpominov/static-land/blob/master/docs/spec.md#apply))
- `Applicative` ([api](https://funland.funfix.org/api/core/interfaces/applicative.html) / [laws](https://funland.funfix.org/api/laws/classes/applicativelaws.html) / [static-land](https://github.com/rpominov/static-land/blob/master/docs/spec.md#applicative))
- `Chain` ([api](https://funland.funfix.org/api/core/interfaces/chain.html) / [laws](https://funland.funfix.org/api/laws/classes/chainlaws.html) / [static-land](https://github.com/rpominov/static-land/blob/master/docs/spec.md#chain))
- `ChainRec` ([api](https://funland.funfix.org/api/core/interfaces/chainrec.html) / [laws](https://funland.funfix.org/api/laws/classes/chainreclaws.html) / [static-land](https://github.com/rpominov/static-land/blob/master/docs/spec.md#chainrec))
- `Monad` ([api](https://funland.funfix.org/api/core/interfaces/monad.html) / [laws](https://funland.funfix.org/api/laws/classes/monadlaws.html) / [static-land](https://github.com/rpominov/static-land/blob/master/docs/spec.md#monad))

### Testing the Included Type-class Laws

The included laws are meant for usage with property-based testing,
so you'll need something like [jsverify](https://github.com/jsverify/jsverify)
as a dependency.

```sh
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

## Contributing

The Funland project welcomes contributions from anybody wishing to
participate.  All code or documentation that is provided must be
licensed with the same license that Funland is licensed with (MIT).

Feel free to open an issue if you notice a bug, have an idea for a
feature, or have a question about the code. Pull requests are also
gladly accepted. For more information, check out the
[contributor guide](CONTRIBUTING.md).

## License

All code in this repository is licensed under the MIT license.  
See [LICENCE](./LICENSE).

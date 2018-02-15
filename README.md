# Funland

[![Travis](https://img.shields.io/travis/funfix/funland.svg)](https://travis-ci.org/funfix/funland)
[![Coverage Status](https://codecov.io/gh/funfix/funland/coverage.svg?branch=master)](https://codecov.io/gh/funfix/funland?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/funfix/funland.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/funland.svg)](https://www.npmjs.com/package/funland)
[![Join chat](https://badges.gitter.im/funfix/funland.svg)](https://gitter.im/funfix/funland?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

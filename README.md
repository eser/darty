# 🎯 [Darty](https://github.com/eserozvataf/darty)

[![build status][build-image]][build-url] [![npm version][npm-image]][npm-url]
[![npm download][download-image]][npm-url] [![dependencies][dep-image]][dep-url]
[![coverage status][coverage-image]][coverage-url]
[![license][license-image]][license-url]

## What is the Darty?

Darty is a front-end development system to allow developers to start their
projects immediately. By Darty's convention over configuration mindset, webpack
and typescript compiler configurations are handled by darty's itself.

This project is the product of many years of iterative development and combined
community knowledge. However you're free to architect your code in the way that
you want, you'll be starting with a structured, scaleable and adaptable
basecode.

- Sample React App Source:
  [https://github.com/eserozvataf/darty-react-app](https://github.com/eserozvataf/darty-react-app)
- Sample React App Preview:
  [http://darty-react-app.s3-website-eu-west-1.amazonaws.com](http://darty-react-app.s3-website-eu-west-1.amazonaws.com)

## Disclosure

The project was named as Dart after the dart game all we know. Although I think
it's a generic name, authorities from Google have claimed dart is a trademarked
name they own. They asked me to find a new name for this project. Otherwise,
they stated that their legal or trademark teams will be involved.

Sadly... that's the reason why I renamed this project as darty.

-- Eser

## Features

- Transforms ES2015+Typescript files with .ts/.tsx extension into
  browser-compatible JavaScript code.
- Module bundling for packing everything into modules with their sourcemaps.
- Dynamic code splitting.
- SASS compilation of .scss files.
- CSS Modules.
- Minification for stylesheets and scripts.
- Hot module reloading and continuous development environment.
- Isomorphic/Universal codebase between server and client.
- Server-side rendering.
- IntelliSense support on TypeScript.
- Unit-testing setup and TDD-ready environment.
- Autoprefixed CSS to avoid adding vendor prefixes.
- Containerization-ready for continuous integration/deployment environments.

## Fixed and Extensible Parts

Static components are:

- Jest for tests.
- Webpack v5 for module bundling.
- express for server-side rendering.

The rest are depends on the preset chosen.

React preset broughts react components and setup, Vue preset broughts vue setup
and etc.

## Quick start

Ensure that `node.js` is installed on your system first.

### Alternative 1

Use the following command to create app with
[create-darty-app](https://github.com/eserozvataf/create-darty-app):

```sh
npx create-darty-app react app
cd app
npm run dev
```

### Alternative 2

Clone a sample app's git repo
`git clone https://github.com/eserozvataf/darty-react-app.git` - and checkout
the [tagged release](https://github.com/eserozvataf/darty-react-app/releases)
you'd like to use.

Execute `npm install` to install dependencies. Then run `npm run dev` for
starting development environment.

## Darty Tasks

Use `darty [task]` command in project folder to execute tasks defined in
`package.json`.

| Task            | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `bundle`        | Builds the project, generates required files                         |
| `bundle:prod`   | Builds the project, generates required files (production)            |
| `start`         | Starts SSR-enabled express server                                    |
| `dev`           | Enables live development environment powered by hot module reloading |
| `test`          | Runs tests to check codebase against unit testing scenerios          |
| `test:coverage` | Runs tests with calculating coverage stats                           |
| `containerize`  | Creates containerization files and gives instructions for docker     |

## Todo List

- Eject
- BrowserSync support
- Service Workers

See [GitHub Projects](https://github.com/eserozvataf/darty/projects) for more.

## Requirements

- node.js (https://nodejs.org/)

## License

Apache 2.0, for further details, please see [LICENSE](LICENSE) file

## Contributing

See [contributors.md](contributors.md)

It is publicly open for any contribution. Bugfixes, new features and extra
modules are welcome.

- To contribute to code: Fork the repo, push your changes to your fork, and
  submit a pull request.
- To report a bug: If something does not work, please report it using
  [GitHub Issues](https://github.com/eserozvataf/darty/issues).

## To Support

[Visit my patreon profile at patreon.com/eserozvataf](https://www.patreon.com/eserozvataf)

[build-image]: https://travis-ci.org/eserozvataf/darty.svg?branch=master
[build-url]: https://travis-ci.org/eserozvataf/darty
[npm-image]: https://img.shields.io/npm/v/darty.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/darty
[download-image]: https://img.shields.io/npm/dt/darty.svg?style=flat-square
[dep-image]: https://img.shields.io/david/eserozvataf/darty.svg?style=flat-square
[dep-url]: https://github.com/eserozvataf/darty
[coverage-image]: https://codecov.io/gh/eserozvataf/darty/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/eserozvataf/darty
[license-image]: https://img.shields.io/npm/l/darty.svg?style=flat-square
[license-url]: https://github.com/eserozvataf/darty/blob/master/LICENSE

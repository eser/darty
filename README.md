# [Dart](https://github.com/eserozvataf/dart)

Dart is a front-end development system to allow developers to start their projects
immediately. By Dart's convention over configuration mindset, webpack and typescript
compiler configurations are handled by dart's itself.

This project is the product of many years of iterative development and combined
community knowledge. However you're free to architect your code in the way that
you want, you'll be starting with a structured, scaleable and adaptable basecode.

* Sample React App Source: [https://github.com/eserozvataf/dart-react-app](https://github.com/eserozvataf/dart-react-app)
* Sample React App Preview: [http://dart-react-app.s3-website-eu-west-1.amazonaws.com](http://dart-react-app.s3-website-eu-west-1.amazonaws.com)


## Features

* Transforms ES2015+Typescript files with .ts/.tsx extension into browser-compatible JavaScript code.
* Module bundling for packing everything into modules with their sourcemaps.
* Dynamic code splitting.
* SASS compilation of .scss files.
* CSS Modules.
* Minification for stylesheets and scripts.
* Hot module reloading and continuous development environment.
* Isomorphic/Universal codebase between server and client.
* Server-side rendering.
* IntelliSense support on TypeScript.
* Unit-testing setup and TDD-ready environment.
* JavaScript and TypeScript linting.
* Autoprefixed CSS to avoid adding vendor prefixes.
* Containerization-ready for continuous integration/deployment environments.


## Fixed and Extensible Parts

Static components are:
* Jest for tests, ESLint for linting.
* Webpack for module bundling.
* express for server-side rendering.

The rest are depends on the preset chosen.

React preset broughts react components and setup,
Vue preset broughts vue setup and etc.


## Quick start

Ensure that `node.js` is installed on your system first.

### Alternative 1
Use the following command to create app with [create-dart-app](https://github.com/eserozvataf/create-dart-app):

```sh
npx create-dart-app react app
cd app
npm run dev
```

### Alternative 2
Clone a sample app's git repo `git clone
   https://github.com/eserozvataf/dart-react-app.git` - and checkout the [tagged
   release](https://github.com/eserozvataf/dart-react-app/releases) you'd like to
   use.

Execute `npm install` to install dependencies. Then run `npm run dev` for starting
development environment.


## Dart Tasks

Use `dart [task]` command in project folder to execute tasks defined in `package.json`.

| Task                     | Description                                                                            |
|--------------------------|----------------------------------------------------------------------------------------|
| `bundle`                 | Builds the project, generates required files                                           |
| `bundle:prod`            | Builds the project, generates required files (production)                              |
| `start`                  | Starts SSR-enabled express server                                                      |
| `dev`                    | Enables live development environment powered by hot module reloading                   |
| `lint`                   | Executes linter to check codebase against linting errors                               |
| `test`                   | Runs tests to check codebase against unit testing scenerios                            |
| `containerize`           | Creates containerization files and gives instructions for docker                       |


## Todo List

- Eject
- BrowserSync support
- Service Workers

See [GitHub Projects](https://github.com/eserozvataf/dart/projects) for more.


## Requirements

* node.js (https://nodejs.org/)


## License

Apache 2.0, for further details, please see [LICENSE](LICENSE) file


## Contributing

See [contributors.md](contributors.md)

It is publicly open for any contribution. Bugfixes, new features and extra modules are welcome.

* To contribute to code: Fork the repo, push your changes to your fork, and submit a pull request.
* To report a bug: If something does not work, please report it using [GitHub Issues](https://github.com/eserozvataf/dart/issues).


## To Support

[Visit my patreon profile at patreon.com/eserozvataf](https://www.patreon.com/eserozvataf)

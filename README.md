# [Dart](https://github.com/eserozvataf/dart)

Dart is a front-end development system to allow developers to start their projects
immediately. By Dart's convention over configuration mindset, webpack and typescript
configurations are handled by dart's itself.

This project is the product of many years of iterative development and combined
community knowledge. However you're free to architect your code in the way that
you want, you'll be starting with a structured, scaleable and adaptable basecode.

* Sample App Source: [https://github.com/eserozvataf/dart-app](https://github.com/eserozvataf/dart-app)
* Sample App Preview: [http://dart-app.s3-website-eu-west-1.amazonaws.com](http://dart-app.s3-website-eu-west-1.amazonaws.com)


## Features

* Transforms ES2015+Typescript files with .ts/.tsx extension into browser-compatible JavaScript code.
* Module bundling with webpack to pack everything into modules with their sourcemaps.
* SASS compilation of .scss files.
* CSS Modules.
* Minification for stylesheets and scripts.
* Hot module reloading and continuous development environment.
* Isomorphic/Universal codebase between server and client.
* IntelliSense support on TypeScript.
* React DevTools support.
* Redux-enabled with thunk and logger middlewares.
* Unit-testing-ready environment.
* JavaScript and TypeScript linting.
* Autoprefixed CSS to avoid adding vendor prefixes.
* Containerization-ready for continuous integration/deployment environments.


## Architecture and Libraries

* React for rendering components.
* React Router for SPA routing.
* Redux for state management.
* bulma and Font-Awesome are included.
* Jest for tests, ESLint for linting.
* Webpack bundling with code splitting enabled.
* express for server-side rendering.


## Quick start

Clone the sample app's git repo `git clone
   https://github.com/eserozvataf/dart-app.git` - and checkout the [tagged
   release](https://github.com/eserozvataf/dart-app/releases) you'd like to
   use.

Execute `npm install` to install dependencies for development environment.


## Dart Tasks

Ensure that `node.js` is installed on your system first.
```bash
$ node --version
```

Use `dart <task>` command in project folder to execute tasks defined in `package.json`.

| Task                     | Description                                                                            |
|--------------------------|----------------------------------------------------------------------------------------|
| `init`                   | Initializes codebase.                                                                  |
| `bundle`                 | Builds the project, generates required files for clients                               |
| `bundle:prod`            | Builds the project, generates required files for clients (production)                  |
| `bundleServer`           | Builds the project, generates required files for SSR                                   |
| `bundleServer:prod`      | Builds the project, generates required files for SSR (production)                      |
| `start`                  | Starts SSR-enabled express server                                                      |
| `dev`                    | Enables live development environment powered by hot module reloading                   |
| `lint`                   | Executes linter to check codebase against linting errors                               |
| `test`                   | Runs tests to check codebase against unit testing scenerios                            |
| `containerize`           | Build and runs container image for docker                                              |


## Todo List

- App Presets
- Init (CLI Create App)
- Eject
- Containerization
- HTML generation
- Helmet
- Bundle + BundleServer together
- BrowserSync support
- Service Workers
- Dynamic Code Splitting

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

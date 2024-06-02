# Sand Saga Scenario - Example

Customized [Sand Game JS](https://github.com/Hartrik/sand-game-js) sandbox.
It matches the technical requirements for [SandSaga.com](https://sandsaga.com) scenario => it could be deployed here as
a community scenario.

Guidelines for scenario development: https://sandsaga.com/manual

Learn basics about public API here: https://github.com/Hartrik/sand-game-js#api


> Checklist
> 1) Customize the title
> 2) Replace all `example-1` occurrences in this project (in package.json and index.html) by your scenario name (lowercase, no whitespace)
> 3) Learn how to build and run the scenario - see below
> 4) Do your work in src/main.js
> 5) Delete this checklist (but keep the rest of the readme)


## Development

### Build

Install [Node](https://nodejs.org/en) which contains npm.

`npm install` downloads dependencies.

`npm run build` builds scenario to `dist`.

`npm run dev` builds scenario, then keeps rebuilding it whenever the source files change.

### Run

A web server is needed to open index.html correctly.
- IDEs like IntelliJ IDEA start web server automatically.
- `npm run serve` starts web server from command line, http://localhost:3000


### Updates

To update Sand Game JS to newer version replace all `24w21a` occurrences in this project.

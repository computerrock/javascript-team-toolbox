# Project delivery process

Purpose of this document is to give procedure steps and overview of the process we follow when delivering product.

### Project repository

All code produces and every project should have repository on `git`. If you are starting a new project and don't have 
repository, ask team leader to create you a new one.

Every project should have `package.json` and `README.md` files in it. They should contain correct basic information about
the project, it's purpose and documentation. `README.md` should also document steps needed to build and run project 
on local developers machine.

### Automated builds

Project should implement automated `npm` scripts for running it locally, testing, and building it for deployment. If you
started project using one of the starter packs those are already implemented for you as `start.js`, `test.js` and 
`build.js` scripts located in `./scripts` folder. Feel free to modify them according to project needs.

### Jest unit testing

We use [*Jest*](https://facebook.github.io/jest/) and [*Enzyme*](http://airbnb.io/enzyme/) for unit testing code. Test 
are run with `./scripts/test.js`. Here are best practices when writing unit tests:

* Write tests first (Test Driven Development).

* place test files in the same folder where tested code is. Test describes how your code works not only test it. This is 
why we name test files in format: `*.spec.js`. When next developers reads your code, he/she can first read the tests 
(Test Driven Code Review). Example folder structure: 

![image](./images/component-folder-structure.png "Component folder structure")

Figure 1: [Component folder structure](./images/component-folder-structure.png)

* Use `it`/`should` format when writing tests. Test written like this, practically write bug report for you. Wrap multiple
`it` statements in `describe` block describing the test subject. Wrap all tests in file in additional `describe` block 
describing the test suit. Example:

```js
describe('Actions', () => {
    describe('sessionActions/fetchSessions', () => {
        it('should create a valid FSA action', () => {
            expect(isFSA(actions.fetchSessions())).toBe(true);
        });

        it('should create an action to fetch sessions', () => {
            expect(actions.fetchSessions()).toHaveProperty('type', actionTypes.FETCH_SESSIONS_REQUEST);
        });
    });
});
```

* Tests should be isolated . All interactions with external services should be mocked. Test should not depend on other tests.

* Don't use `beforeEach` for test setup. Implement simple `setup()` function that can be called in test to prepare 
parameters.

* Automate when possible. Tests are code too, so be creative and save your self from redundancy. 

* Minimal test for React components is that component renders successfully. Use *Jest* snapshots to aid this kind of tests. 

* Write pure functions, so you can test easily. 


### `git commit` rules

Follow these rules when committing code: 

* Do not commit passwords or any other sensitive type of configuration (private keys, oauth client & secret, etc). We 
intentionally place sensitive data in `.env` files that are git-ignored and never committed to repository but saved 
instead in secure way in CI system.

* Make commit message clear. It should contain verb in imperative and subject of change. No periods. Keep subject short, 
limit is 50 characters. Examples:

```fix login bug```

```implement hover state```

* Prepend commit message it with ticket number when available (format `#ticketNo message`). Prepend commit message with 
domain topic in square brackets if project complex/has more independent segments. Examples:

```#35689 fix login bug```

```[ui] implement hover state```

```[auth] #784512 add password recovery module```

* Write description with explanation for more complex changes. Cover *what* and *why*, not *how*. Provide URL's for 
external sources when possible. Description should be separated from subject with one empty line. Wrap description text 
at 72 characters (all but URL's). Webstorm/Phpstorm conveniently marks column with line for you in commit window. Example: 

```
[auth] #784512 add password recovery module

This a description for change.
```

## `git` branching model

We use [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model) for projects. It allows
us to regularly deploy and work on both new features and fixes for code in QA process without accidentally mixing up 
untested and tested code. Let's go over procedures described by model.

### The main branches: `master` & `develop`

Repository has only two permanent branches:

* `master` - is the main branch where the source code of *HEAD* always reflects a production-ready code.

* `develop` - is the main branch where the source code of *HEAD* always reflects latest delivered development changes.
for the next release. New code is not committed directly to `develop` branch, but through feature branches.

When the source code in the `develop` branch reaches a stable point and is ready to be released, all of the changes should 
be merged back into `master`. This is a achieved indirectly with `release-*` branch.

Unlike the main branches, feature and release branches always have a limited life time, since they will be removed eventually.

### Feature branches: `feature-*`

...

### Release branches: `release-*`

...

### Deployment environments

...

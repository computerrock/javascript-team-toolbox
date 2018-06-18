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

* Before pushing your commit, always do a rebase of working branch. This produces clean tree, 
while avoiding un-necessary merge:  

```bash
$ git status
    On branch feature-name
    Your branch is up-to-date with 'origin/feature-name'.
    ...
$ git commit -m "implement some aspect of feature"
$ git pull --rebase origin fature-name
$ git push origin feature-name
```


## `git` branching model

We use [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model) for projects. It allows
us to regularly deploy and work on both new features and fixes for code in QA process without accidentally mixing up 
untested and tested code. Let's go over procedures described by model.


### The main branches: `master` & `develop`

Repository has only two permanent branches:

* `master` - is the main branch where the source code of *HEAD* always reflects a production-ready code.

* `develop` - is the main branch where the source code of *HEAD* always reflects latest delivered development changes
for the next release. This is a CI baseline. New code is rarely committed directly to `develop` branch, but is merged 
through feature branches.

We intentionally avoid naming branches like 'production', 'staging', etc. These are deployment environments and there 
can be many of them - 'pre-production', 'integration', 'pre-staging'... From code perspective there are only two types of 
code - tested (stable) and untested (still worked on). So to avoid confusion and code loss, we stick to `master` and `develop`

When the source code in the `develop` branch reaches a stable point and is ready to be released, all of the changes should 
be merged back into `master`. This is a achieved indirectly with `release-*` branch. We will cover this procedure in 
next chapters.

Beside main branches, on daily basis we use variety of supporting branches: 

* feature branches, 
* release branches and 
* hotfix branches

Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.


### Feature branches: `feature-*`

> Branches off from: `develop`
>
> Merges back into: `develop`
>
> Naming: `feature-*`

Feature branches are used to develop new features for the upcoming or a distant future release. Target release in which
feature will be incorporated may be unknown but branch can exist and eventually be merged back to `develop` or discarded.

Creating a feature branch:

```bash
$ git checkout -b feature-name origin/develop
```

Incorporating a finished feature back to `develop`:

```bash
$ git checkout develop
$ git checkout --pull-rebase origin/develop # make sure you have latest state
$ git merge --no-ff feature-name
$ git push origin develop
$ git branch -d feature-name # delete branch
$ git push origin :feature-name # delete branch from remote
```

When merging, always use `--no-ff` tag. This causes the merge to always create a new commit object, even if the merge
could be performed with a fast-forward. This avoids  losing information about the historical existence of a feature 
branch and groups together all commits that together added the feature. It is also easier to revert the merge.


### Release branches: `release-*`

> Branches off from: `develop`
>
> Merges back into: `develop`, `master`
>
> Naming: `release-*`

Release branches support preparation of a new production release. They allow for last-minute changes and more importantly
bug fixes. Here we also prepare meta-data for release: version number, build date, etc. In the meantime `develop` branch
is free to receive features for next big release without jeopardizing QA process with untested code.

Creating a release branch:

```bash
$ git checkout -b release-name origin/develop
$ npm --no-git-tag-version version minor # we may bump major version instead
$ git commit -a -m "update version number"
```

When we create release branch, we decide will it be a *major* or *minor* [SemVer](https://semver.org/) release. From now
on branch enters into final QA process. It is deployed to appropriate environment and worked on with possible changes 
and bug fixes. Before each deployment patch number of version number should be raised:

```bash
$ npm --no-git-tag-version version patch
$ git commit -a -m "update version number"
```

When branch is ready to be published to production we merge `release-*` to `master` and tag the release:

```bash

```


### Deployment environments vs. branching model

...

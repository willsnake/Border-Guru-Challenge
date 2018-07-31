# Border Guru Code Challenge

This is a backend created with the [KoaJS](https://github.com/koajs/koa) Framework.

This repository integrates:

- [Jest](https://facebook.github.io/jest/)

## Requirements

- **Nodejs** >= 8.11.3
- **Npm** >= 5.6.0
- **Yarn** >= 1.7.0
- **Docker** >= 18.03.1-ce

## Installation

You just need to run:

```
npm install
```

or

```
yarn install
```

wait for all the dependencies to be installed.

## NPM Scripts

The scripts are:

- `yarn run test`: this script runs the unit tests with jest
- `yarn run turn:on:test:instance`: with this script, you can turn on the MongoDB instance, to execute all the tests or for development
- `yarn run tearDown:test:instance`: with this script, you turn off the MongoDB instance
- `yarn run dev`: this script is used for the development of the app, it enables a nodemon
- `yarn run start`: this script is used for runnning the app

## Answer

* Why did you pick your first particular your design? What assumptions did you make, and what tradeoffs did you consider?
    - I have experience creating backend servers with REST standards, so I always try to create a scalable and mantainable code. I always try to extend the functionality of my code, instead of overwriting it, this is easier for a migration.
* What did you consider when you had to design the second solution? And which assumptions and tradeoffs you made?
    - I try to consider the scalability, community, documentation available, small footprint and learning curve.
* What do you like (and dislike) about Node/Javascript compared to other programming languages?
    - I love Javascript cause it's asynchronous by default, this helps a lot for scheduled or heavy requests, but I think that if you don't know very well the language, you can get a little bit lost when trying to develop new code.
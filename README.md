# Banka
[![Pull Request](https://img.shields.io/github/issues-pr-raw/benisi/Banka.svg)](https://github.com/benisi/Banka/pulls?q=is%3Aopen+is%3Apr)
[![Pull Request](https://img.shields.io/github/issues-pr-closed-raw/benisi/Banka.svg)](https://github.com/benisi/Banka/pulls?q=is%3Apr+is%3Aclosed)
[![Build Status](https://travis-ci.org/benisi/Banka.svg?branch=develop)](https://travis-ci.org/benisi/Banka)
[![Coverage Status](https://coveralls.io/repos/github/benisi/Banka/badge.svg?branch=develop)](https://coveralls.io/github/benisi/Banka?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/f79362259d34a1443406/maintainability)](https://codeclimate.com/github/benisi/Banka/maintainability)

## Description

Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..

[Project Planned with PIVOTAL TRACKER](https://www.pivotaltracker.com/projects/2319945)

<br/><b>UI pages:</b>

[For user template](https://benisi.github.io/Banka/UI/bank-account-profile.html)

[For admin Template](https://benisi.github.io/Banka/UI/account-list.html)

<b>Api Url:</b>

[Hosted API on Heroku](https://benisi-banka.herokuapp.com/)<br/>
[API documentation](https://benisi-banka.herokuapp.com/swagger/swagger.json)


## Default user credentials for testing

-   Admin : email: admin@gmail.com, password: adminpass1
-   Client: email: user@gmail.com, password: clientpass1

Make sure you remove all default users if you are running in production, the above users are for 
testing purposes and it is not recommended to have them if you are using this app for production purpose or atleast just change the credentials
<br>

## Installation

1.  Clone the repository by running the code below:
```shell
git clone https://github.com/benisi/Banka.git
```
2.  cd into the repository:
```shell
cd Banka
```
3.  Open the repository in terminal and Install dependencies by running:
```shell
npm install
```
4.  Create a .env file in the root directory and setup your token SECRET
5.  Run "npm start" to start the app or "npm run start:dev" for nodemon to watch
```shell
npm run start:dev
```
6.  Use Postman to test all endpoints
7.  Run "npm test" to test all endpoints or "npm run test:dev" for development
```shell
npm run test:dev
```

## Technologies

ES6: See [here](https://en.wikipedia.org/wiki/ECMAScript) for details.

NodeJS: An open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development. Visit [here](https://nodejs.org/en/) for details.

ExpressJS: This is the web application framework for Node.js Visit [here](https://expressjs.com) for details.

Airbnb JavaScript style guide was adopted as a coding convention, see [here](https://github.com/airbnb/javascript) for details.

[Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for testing

**Note: Project is still under development**

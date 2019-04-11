# Banka
[![Pull Request](https://img.shields.io/github/issues-pr-raw/benisi/Banka.svg)](https://github.com/benisi/Banka/pulls?q=is%3Aopen+is%3Apr)
[![Pull Request](https://img.shields.io/github/issues-pr-closed-raw/benisi/Banka.svg)](https://github.com/benisi/Banka/pulls?q=is%3Apr+is%3Aclosed)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0d16ef5a0b82416786e086b91480a326)](https://app.codacy.com/app/oseikwemeisidahomen/Banka?utm_source=github.com&utm_medium=referral&utm_content=benisi/Banka&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.org/benisi/Banka.svg?branch=develop)](https://travis-ci.org/benisi/Banka)
[![Coverage Status](https://coveralls.io/repos/github/benisi/Banka/badge.png?branch=develop)](https://coveralls.io/github/benisi/Banka?branch=develop)
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

[Hosted API on Heroku](https://benisi-banka.herokuapp.com/)

## Features

Below are the basic features of BANKA Application at this point

###

-   Users can signup

-   Users can login

-   User create bank account

-   Admin/Staff can activate or deactivate an account

-   Admin/Staff can delete an account

-   Staff (cashier) can credit an account

-   Staff (cashier) can debit an account

## Default user credentials for testing

-   Admin : email: bisidahomen@gmail.com, password: adminpass1

-   Client: email: bisidahomen999@gmail.com, password: clientpass1

Make sure you remove all default users if you are running in production, the above users are for 
testing purposes and it is not recommended to have them if you are using this app for production purposes
<br>

## API Endpoints

Make sure you supply an Authorization header or a token param of the token returned when registering/ login in order to have access to application
<table>

<tr><th>HTTP VERB</th><th>API ENDPOINTS VERSION 1</th><th>FUNCTION</th><th>INPUT</th><th>OUTPUT</th></tr>

<tr>
<td>POST</td> <td>api/v1/auth/signup</td><td>User Sign Up</td>
<td>
{<br> firstName: "string",<br>lastName: "string",<br>email: "string",<br> password: "string"<br>,<br> stateOfResidence: "string",<br> phoneNumber: "string",<br> title: "string",<br> dataOfBirth: "string",<br> sex: "string"<br>}
</td>
<td>
{<br> status: "integer",<br>data: "object"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/auth/login</td>  <td>User Login</td>
<td>
{<br> email: "string",<br>password: "string"<br>}
</td>
<td>
{<br> status: "integer",<br>data: "object"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/accounts</td>  <td>Create bank account</td>
<td>
{<br> type: "string",<br>category: "string"<br>}
</td>
<td>
{<br> status: "integer",<br>data: "object"<br>}
</td>
</tr>

<tr>
<td>PATCH</td> <td>api/v1//account/<account-number></td>  <td>Admin/Staff can activate or deactivate an account</td>
<td>
{<br>status: "string" <br>}
</td>
<td>
{<br> status: "integer",<br>data: "object"<br>}
</td>
</tr>

<tr>
<td>DELETE</td> <td>api/v1//accounts/<account-number></td>  <td>Delete a specific bank account</td>
<td>
{<br> <br>}
</td>
<td>
{<br> status: "integere",<br>data: "object"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1//transactions/<account-number>/debit</td>  <td>Debit a bank account</td>
<td>
{<br>amount: "float <br>}
</td>
<td>
{<br> status: "integer",<br>data: "object"<br>}
</td>
</tr>

<tr>
<td>POST</td><td>api/v1//transactions/<account-number>/credit</td><td>Credit a bank account</td>
<td>
{<br>amount: float <br>}
</td>
<td>
{<br> status: "integer",<br>data: "object"<br>}
</td>
</tr>
</table>

## Installation

1.  Clone this repository below:

```
https://github.com/benisi/Banka.git
```

2.  cd into the repository:

```
cd Banka
```

3.  Open the repository in terminal and Install dependencies by running:

```
npm install
```

5.  Create a .env file in the root directory and setup your token SECRET

6.  Run "npm start" to start the app or "npm run start:dev" for development

7.  Use Postman to test all endpoints

8.  Run "npm test" to test all endpoints or "npm run test:dev" for development

## Technologies

ES6: See [here](https://en.wikipedia.org/wiki/ECMAScript) for details.

NodeJS: An open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development. Visit [here](https://nodejs.org/en/) for details.

ExpressJS: This is the web application framework for Node.js Visit [here](https://expressjs.com) for details.

Airbnb JavaScript style guide was adopted as a coding convention, see [here](https://github.com/airbnb/javascript) for details.

**_This project is still under development phase. PLS CHECK BACK FOR UPDATES_**

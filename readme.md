## Analyzing Web-Sites

> Analyzing getting main information about the website
- Internal and external links
- Title and description
- Headings
- Login forms


### Project structure

````
build/
|- index.html _________________________________ # application html 
client/
|- index.jsx __________________________________ # Application entry point
|- App.jsx ____________________________________ # Application init
|- Constants.js _______________________________ # Application constants
|  |- Components/
|    |- Common/ _______________________________ # Reusable components
|       |- error/ _____________________________ # Error component
|    |- Search-box/ ___________________________ # Search box component
|    |- Search-result/ ________________________ # Search result component
server/     
|- index.js __________________________________ # Nodejs entry point and routes
|- helpers.js ________________________________ # Utils.
|- dataServer.js _____________________________ # Appication logic

  
````




### Table of contents

[Install](#install)

[Run development](#run-development)

[Unit testing](#unit-testing)

[Bundling](#bundling)

[Technologies used](#technologies-used)

#### Install

* `npm install` or `yarn` to install all dependency.

#### Run development

* Run server `yarn start`
* Run Front-End `yarn start:frontend`

#### Unit testing

> Will run watch all and coverage

* `yarn test`

#### Bundling

* Run `yarn build`

#### Technologies used

* [Webpack 4](https://github.com/webpack/webpack) [ Using the new development mood ]
* [Babel 7](https://github.com/babel/babel) [ transforming JSX and es6 ]
* [React](https://github.com/facebook/react) 
* [Lodash](https://github.com/lodash/lodash)
* [Jest](https://github.com/facebook/jest) [ Unit test]
* [Enzyme](http://airbnb.io/enzyme/) for UI testing.
* [ExpressJS](http://airbnb.io/enzyme/) Nodejs Server.
* [Cheerio](https://cheerio.js.org/) Parses markup and provides an API
* [Eslint](https://github.com/eslint/eslint/) with airbnb config
* [Prettier](https://github.com/prettier/prettier) [ Code formatter ]
* [Style](https://github.com/webpack-contrib/style-loader) & [CSS Loader](https://github.com/webpack-contrib/css-loader)



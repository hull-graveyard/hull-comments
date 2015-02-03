Comments Ship
==========

A comments widget you can embed in your site.

Built with [React](http://facebook.github.io/react/). 

## Manifest URL

    https://hull-ships.github.io/comments/manifest.json

## Options

[todo]

## Developing


#### Setup
- Ensure that [Node.js](http://nodejs.org), [Bower](http://bower.io/) and [Webpack](http://webpack.github.io) are installed.
- We recommend installing the webpack development server: `npm install webpack-dev-server -g`
- Run `npm install && bower install` to ensure the required dependencies are installed.
- Rename `env.json.sample` to `env.json` and enter a valid [Hull.io](http://hull.io) Ship ID and Org URL

#### Dev Cycle
- Run `webpack-dev-server --progress --colors` and visit [http://localhost:8080](http://localhost:8080).
- Write Code
- Drink Coffee
- Be nice to others
- Publish

## Publishing
- When publishing, the manifest file and assets must be publicly available so Hull can use your ship.

## Deploying

- Publish anywhere you like, as long as Hull can access a `manifest.json` file that describes all assets and configuration options. A good way to start is by publishing the built project to the `gh-pages` branch, and linking to the `github.io` public URL

Comments Ship
==========

A comments widget you can embed in your site.

Built with [React](http://facebook.github.io/react/). 

## Manifest URL

    https://hull-ships.github.io/comments/manifest.json

## Ship Options

[todo]

## Developing

#### Setup
- Ensure that [Node.js](http://nodejs.org), [Bower](http://bower.io/) and [Webpack](http://webpack.github.io) are installed.
- We recommend installing the webpack development server: `npm install webpack-dev-server -g`
- Run `npm install && bower install` to ensure the required dependencies are installed.
- Go to http://dashboard.hull.io/develop/new, click "Create Ship"
- Rename `env.js.sample` to `env.js` and paste the generated `ID`.
- Edit the the generated `manifest.json` to you heart's content. When done, download it and save it as `manifest.json`.
- Preview the generated Ship and Deployment settings from this page and simulate events in the `Admin` tab.
- Load `http://localhost:8080/demo.html`. Your ship should load. The main entry point is `ship.js`

#### Development
- Run `gulp server` and visit [http://localhost:8080/demo.html](http://localhost:8080/demo.html).
- Write Code
- Drink Coffee
- Be nice to others
- Repeat
- Publish

## Build
- When publishing, the manifest file and assets must be publicly available so Hull can use your ship.
- run `gulp build`

## Deployment
- Publish anywhere you like, as long the following files are public:
- `manifest.json`
- `index.html`
- `ship.js`
 
A good way to start is by publishing the built project to the `gh-pages` branch, and linking to the `github.io` public URL. 

The included `gulp deploy` task will do this for you.

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
- If not done already, create ad Development Platform. To do this, go to "Platforms", create a new Web Platform, and enter `http://localhost:8080` as the URL.
- Rename `env.js.sample` to `env.js` and enter the [Hull.io](http://hull.io) Platform ID and Org URL.
- In the Hull Dashboard, click "Ships" > "Add Ship" > "From Manifest URL"
- Enter the publicly visible URL to your `manifest.json`
- In the Ship, click "Add to Platform" and pick your Dev platform.
- Load `http://localhost:8080/demo.html`

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

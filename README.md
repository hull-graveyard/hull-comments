Comments Ship
==========

A Comments [Ship](http://hull.io/ships) you can embed in your site built with [React](http://facebook.github.io/react/). 

## Manifest URL

    https://hull-ships.github.io/comments/manifest.json

## Ship Options

[todo]


## Building Ships

You can use the tooling of your choice to build Ships, they're technology-agnostic. However, after spending months building them, we've settled on a stack that's a combination of sheer power and ease of use. We recommend it strongly.

##### Read about:

- How to easily handle dependency management in [Ships Boot Sequence](HULL_BOOT_README.md) with HTML Imports
- [How to get Scoped Styles](STYLES_SANDBOX.md) in every browser by rendering the component into a lightweight Iframe


Using this setup, You get [Scoped Styles](STYLES_SANDBOX.md), [React Hot Code Replacement](https://github.com/gaearon/react-hot-loader), [Webpack](http://webpack.github.io/) with Automatic Reloading of all assets, and [React](http://facebook.github.io/react/), for free, baked in and ready to use.

__Enjoy the future__.



## Setup
- Install [Node.js](http://nodejs.org), [Bower](http://bower.io/), [Webpack](http://webpack.github.io) [Gulp](http://gulpjs.com/) if not done already, and project dependencies:

```sh
# First, install node+npm from http://nodejs.org/download/
npm install -g bower gulp webpack
npm install && bower install
```

- Go to http://dashboard.hull.io/develop/new, click "Create Ship"
- Rename `env.js.sample` to `env.js`, paste the generated `ID`.
- Save the the generated `manifest.json` to your project's root, edit it to heart's content. Upload back to dahsboard.
- Preview Ship and Deployment settings, simulate events in the `Admin` tab.
- Run `gulp server`
- Load `http://localhost:8080/demo.html`. Your ship should load. The main entry point is `ship.js`

## Development

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

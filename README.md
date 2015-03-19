Comments Ship
==========

A Comments [Ship](http://hull.io/ships) you can embed in your site built with [React](http://facebook.github.io/react/). 

## Manifest URL

    https://hull-ships.github.io/hull-comments/manifest.json

## Ship Options

[todo]

---

### Ship Architecture
__Enjoy the future__.

Uses [Hull Ship Boilerplate](https://github.com/hull-ships/hull-ship-boilerplate/blob/master/README.md)

```
/index.html //Demo Page. Contains Hull.js library
/index.js   // Manual Ship embed, optional.
/ship.html  // Ship HTML Import, Embedded by Hull.js on boot
/ship.js    // Ship entry point. Loaded from ship.html.
```

### Setup

```sh
npm install -g gulp
npm install
gulp server
```

### Configuration

- Go to the Hull Dashboard, Create a Platform with URL you will use to demo your ship. For instance, this ship is hosted at `http://hull-ships.github.io/hull-comments`.
- Copy the snippet, paste in `index.html`
- In the dashboard, click `Ships > Add Ship > From URL`.
- Enter the url of the `manifest.json` (it must be publicly accessible), give a name to your ship

### Developing

- Run `gulp server` and visit [http://localhost:8081/](http://localhost:8081/).
- We setup a ngrok tunnel with the subdomain matching `name` in `package.json`. Ensure it's not used, For now we don't do error checking.
- Write Code
- Drink Coffee
- Be nice to others
- Repeat
- Publish

### Building

```sh
gulp build
```

### Deployment on Github Pages

```sh
gulp deploy
```
 

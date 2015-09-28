Comments Ship
==========

A Comments [Ship](http://www.hull.io/docs/apps/ships) you can embed in your site. Built with [React](http://facebook.github.io/react/). 

## Manifest URL

    https://ships.hull.io/hull-comments/manifest.json

---

### Ship Architecture

```
/src/ship.js    // Ship entry point. Required
/src/index.html // Demo Page. Optional
/src/index.js   // Manual Ship embed, optional.
/manifest.json   // Ship Manifest file. Describes settings
/src/locales/en.json   // Translation file
```

### Setup

```sh
npm install -g gulp && npm install
```

### Configuration

- Go to the Hull Dashboard, Create a Platform with URL you will use to demo your ship. For instance, this ship is hosted at `http://ships.hull.io/hull-comments/`.
- Copy the snippet, paste in `index.html`
- In the Platform customization screen, click `Add Ship > New Ship > Hull Ship Boilerplate`
- Go to the `Advanced` tab, and input the URLs to your ship so that Hull can access the `manifest.json`. Save

### Developing

- Customize `config.js` and create `.env.sh` from `.env.sh.sample`
- Run `gulp` and visit [http://localhost:8081/](http://localhost:8081/).
- We setup a ngrok tunnel with the subdomain matching `name` in `package.json` if a Ngrok token is present in environment
- Write Code
- Drink Coffee
- Be nice to others
- Repeat
- Publish

### Available Tasks

```

gulp sass //Rebuild custom version of Foundation framework

gulp prepare //Copy static files and rebuild Foundation

gulp // serve and watch, use Ngrok to make it publicly available if token present

gulp build //Build

gulp deploy // Build + Deploy to Github Pages + invalidate Cloudfront (only for Hull team)
```


More tasks are available in `/gulp_tasks`

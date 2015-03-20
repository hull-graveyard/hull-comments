import App from './components/app';
import en from '../locales/en.json';

Hull.ready(function(hull, me, platform, org) {
  var d = platform.deployments[0];
  d.ship.translations.en = en;

  App.start(document.querySelector('#ship'), d);
});

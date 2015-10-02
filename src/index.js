import start from './start';
// import en from '../locales/en.json';

Hull.ready(function(hull, me, platform) {
  const d = platform.deployments[0];
  // d.ship.translations.en = en;
  start(document.querySelector('#ship'), d, Hull);
});

import App from './components/app';

Hull.ready(function(hull, me, platform, org) {
  var d = platform.deployments[0];
  App.start(document.querySelector('#ship'), d, Hull);
});

import App from './components/app';

Hull.ready(function(hull, me, platform, org){
  //// When developing on localhost, skip the embed process and start the ship directly

  var d = platform.deployments[0];
  App.start(document.querySelector('#ship'), d);

  //// When embedded by Hull. this is how the app will be booted automatically.
  //// You don't have to call this yourself. Hull will do it for you
  // hull.embed(platform.deployments)
})

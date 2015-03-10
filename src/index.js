import App from './components/app';
Hull.init(hullConfig);

var appInit = function(hull, me, platform, org){

  // When embedded by Hull. this is how the app will be booted:
  hull.embed(platform.deployments)

  // In development, skip the embed process and start the ship directly
  // App.start(document.getElementById('ship'),platform.deployments[0]);
}

Hull.ready(appInit)

import App from './components/app';

Hull.ready(function(hull, me, platform, org){
  if(platform.type==='ship'){
    var deployment= { ship:platform, settings: {selector:'#ship'} }
  } else {
    var deployment = platform.deployments[0];
  }
  App.start(document.querySelector(deployment.settings.selector),deployment);
})

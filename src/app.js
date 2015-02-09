var Hull = require('./lib/hull-init');

Hull.init(HULL_CONFIG, function(hull, me, platform, org){

  // Clone the Ship so we're safely using it
  var platform = JSON.parse(JSON.stringify(platform));

  // Ensure we only have 1 deployment for test mode
  var deployment = platform.deployments[0];
  delete platform.deployments;

  
  // Change structure to pass the right format;
  deployment.platform = platform;

  // Fake the Homepage URL for the embedded ship
  deployment.ship.index = deployment.ship.manifest.index

  // Fake deployment options to insert the ship in the test page.
  deployment.settings = {
    $el:'#ship',
    $placement:'bottom',
    $multi:true,
    $fullpage: false
  };

  // For full apps, do this to embed the ship in a raw way.......
  // Ship.start(document.getElementById('ship'),deployment);
  // Only one ship testing at a time, but Hull.embed expects an array;
  Hull.embed([deployment]);
  
});

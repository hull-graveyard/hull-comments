import _ from 'lodash';

export default function detectShip(hull, shipName) {
  return hull.ready((h, me, platform)=>{
    return _.some(
      _.map(platform.deployments, (item)=> {
        return item.ship.manifest_url.indexOf(`/${shipName}/manifest.json`) > 0;
      }));
  });
}

import React from 'react';
import ReactDOM from 'react-dom';
import _ from './lib/lodash';
import Engine from './lib/engine';
import I18n from './lib/i18n';

import App from './components/app';

module.exports = function(element, deployment, hull) {
  const entity = hull.entity.encode(Hull.findUrl().split('#')[0]);

  I18n.setTranslations(deployment.ship.translations);

  deployment.settings = _.defaults({}, deployment.settings, {
    entity_id: entity,
  });

  const engine = new Engine(deployment, hull);

  if (deployment.onUpdate && typeof deployment.onUpdate === 'function') {
    deployment.onUpdate(function(ship) {
      I18n.setTranslations(ship.translations);
      engine.updateShip(ship);
    });
  }

  ReactDOM.render(<App engine={engine} />, element);
};

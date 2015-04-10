import React from 'react';
import _ from 'underscore';
import inflections from 'underscore.inflections';
import underscoreString from 'underscore.string';
import Comments from './comments';
import Engine from '../lib/engine';
import { setTranslations } from '../lib/i18n';
import styles from '../styles/main.scss';
import HullStyle from './hull-style';

_.mixin(inflections);
_.mixin(underscoreString.exports());

var App = React.createClass({
  propTypes: {
    engine: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return this.props.engine.getState();
  },

  componentWillMount: function() {
    this.props.engine.addChangeListener(this._onChange);
  },

  componentDidMount: function() {
    // This is more robust than embedding the styles in the Iframe's Head using the head="" property
    this.props.styles.use(this.getStyleContainer());
  },

  componentWillUnmount: function() {
    this.props.styles.unuse();
    this.props.engine.removeChangeListener(this._onChange);
  },

  getStyleContainer: function(){
    if(this.refs && this.refs.frame){
      return this.refs.frame.getDOMNode().contentDocument.head
    }
    return document.getElementsByTagName('head')[0];
  },

  _onChange: function() {
    this.setState(this.props.engine.getState());
  },

  render: function() {
    var s = {
      minHeight: 350
    };

    return <div style={s}>
      <HullStyle {...this.state.settings}/>
      <Comments {...this.state} actions={this.props.engine.getActions()} />
    </div>
  },

  statics: {
    // Expose a static entry point to boot the ship
    start : function(element, deployment){
      var entity = Hull.entity.encode(Hull.findUrl())

      setTranslations(deployment.ship.translations);

      deployment.settings = _.defaults({}, deployment.settings, {
        entity_id: entity
      });

      var engine = new Engine(deployment);
      var app = <App engine={engine} styles={styles} />;
      React.render(app, element);
    }
  }
});


module.exports = App;

import _         from 'underscore';
import React     from 'react';
import Comments  from './comments';

import Engine    from '../lib/engine';
import styles    from '../styles/main.scss';

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

  renderContent: function() {
    return <Comments {...this.state} actions={this.props.engine.getActions()} />
  },

  render: function() {
    if (this.props.sandbox) {
      return <Frame ref='frame'>{this.renderContent()}</Frame>;
    } else {
      return this.renderContent();
    }
  },

  statics:{
    // Expose a static entry point to boot the ship
    start : function(element, deployment, target={}){

      var entity = Hull.entity.encode(document.location.toString());
      deployment.settings = _.defaults({}, deployment.settings, {
        entity_id: entity
      });

      var engine = new Engine(deployment);
      React.render(<App engine={engine} styles={styles} />, element);
    }
  }
});


module.exports = App;

import _            from 'underscore';
import inflections  from 'underscore.inflections'; 
_.mixin(inflections);
import underscore_string  from 'underscore.string'; 
_.mixin(underscore_string.exports());


import React     from 'react';
import Comments  from './comments';

import Engine    from '../lib/engine';
import styles    from '../styles/main.scss';
import HullStyle from './hull-style';

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
    return <div>
      <HullStyle {...this.state.settings}/>
      <Comments {...this.state} actions={this.props.engine.getActions()} />
    </div>
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

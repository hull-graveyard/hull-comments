import React     from 'react';
import _         from '../lib/lodash';
import Comments  from './comments';
import Engine    from '../lib/engine';
import I18n      from '../lib/i18n';
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
    var style = this.props.styles.use(this.getStyleContainer());
    this.setState({rootCssClass:style.locals.ship})
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
      paddingBottom: 200
    };

    return <div style={s} className={this.state.rootCssClass}>
      <HullStyle {...this.state.settings} rootCssClass={`.${this.state.rootCssClass}`}/>
      <Comments {...this.state} actions={this.props.engine.getActions()} />
    </div>
  },

  statics: {
    // Expose a static entry point to boot the ship
    start : function(element, deployment, hull){
      var entity = hull.entity.encode(Hull.findUrl())

      I18n.setTranslations(deployment.ship.translations);

      deployment.settings = _.defaults({}, deployment.settings, {
        entity_id: entity
      });

      var engine = new Engine(deployment, hull);
      var app = <App engine={engine} styles={styles} />;
      React.render(app, element);
    }
  }
});


module.exports = App;

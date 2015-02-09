'use strict';
var _ = require('underscore');
var React = require('react');
var assign = require('object-assign');
var Engine = require('./lib/engine');
var Comments = require('./components/comments');
var Frame = require('./components/iframe');
var styles = require('./styles/main.scss');

var Ship = React.createClass({

  propTypes: {
    engine: React.PropTypes.object.isRequired,
    sandbox: React.PropTypes.bool,
  },

  getInitialState: function() {
    return this.props.engine.getState();
  },

  componentWillMount: function() {
    this.props.engine.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    this.props.styles.use(this.getStyleContainer());
  },
  componentWillUnmount: function() {
    this.props.styles.unuse(this.getStyleContainer());
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

  renderStyles: function(){
    var styles = this.props.styles
    return styles.map(function(style){
      return <style>{style[1]}</style>
    });
  },
  renderContent: function() {
    // return <div><p>+++_</p><h1>Cool</h1></div>;
    return <Comments {...this.state} actions={this.props.engine.getActions()} />
  },

  render: function() {
    if (this.props.sandbox) {
      return <Frame ref='frame'>{this.renderContent()}</Frame>;
    } else {
      return this.renderContent();
    }
  }
});


Hull.onEmbed(document, function(element, deployment){
  Ship.start(element, deployment);
});


Ship.start = function(element, deployment){
  deployment.settings = _.defaults({}, deployment.settings, {
    entity_id: Hull.util.entity.encode(document.location.toString())
  });

  var engine = new Engine(deployment);

  React.render(<Ship engine={engine} sandbox={true} styles={styles} />, element);
}

module.exports = Ship;

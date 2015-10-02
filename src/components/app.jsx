import React from 'react';
import Comments from './comments';
import HullStyle from './hull-style';

const App = React.createClass({
  propTypes: {
    engine: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return this.props.engine.getState();
  },

  componentWillMount() {
    this.props.engine.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    this.props.engine.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(this.props.engine.getState());
  },

  render() {
    return (
      <div styleName="ship">
        <HullStyle { ...this.state.settings} rootClass=".ship"/>
        <div className="ship">
          <Comments { ...this.state} actions={this.props.engine.getActions()} />
        </div>
      </div>
    );
  },

});

module.exports = App;

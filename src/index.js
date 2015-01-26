var React = require('react');

var Header = require('./header');
var Conversation = require('./conversation');

module.exports = React.createClass({
  render: function() {
    if (this.props.isReady) {
      return <div style={{ padding: 10, margin: 10 }}>
        <Header {...this.props} />
        <Conversation {...this.props} />
      </div>;
    } else {
      return <div>...</div>;
    }
  }
});


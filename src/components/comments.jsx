import React from 'react';

import Header from './header';
import Conversation from './conversation';

var Comments = React.createClass({
  render: function() {
    if (this.props.isReady) {
      return <div style={{ padding: 10, margin: 10 }}>
        <Header {...this.props} />
        <Conversation {...this.props} />
      </div>;
    } else {
      return <small>Loading</small>;
    }
  }
});

module.exports = Comments

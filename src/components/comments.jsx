import React from 'react';
import MainNav from './main-nav';
import Conversation from './conversation';
import Icon from './icon';

var Comments = React.createClass({
  render: function() {
    if (this.props.isReady) {
      return <div className=''>
        <MainNav {...this.props} />
        <Conversation {...this.props} />
      </div>;
    } else {
      return <Icon name='spinner' size={32} centered/>;
    }
  }
});

module.exports = Comments

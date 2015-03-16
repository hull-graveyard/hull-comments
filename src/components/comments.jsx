import React        from 'react';
import MainNav      from './main-nav';
import SubNav       from './sub-nav';
import Conversation from './conversation';
import Icons        from './icons';

var Comments = React.createClass({
  render: function() {
    console.log('LES PROPS', this.props);
    if (this.props.isReady) {
      return <div>
        <MainNav {...this.props} />
        <SubNav {...this.props} />
        <Conversation {...this.props} />
      </div>;
    } else {
      return <Icons.Spinner size="64" centered/>;
    }
  }
});

module.exports = Comments

import React from 'react';
import DropdownMenu from './dropdown-menu';

var ShareMenu = React.createClass({

  getTitle: function() {
    return this.props.title || <span>
      <span className="label">Share</span> <span className="icon-export" />
    </span>;
  },

  getOptions: function() {
    return [
      { label: 'Facebook', value: 'facebook' },
      { label: 'Twitter', value: 'twitter' }
    ];
  },

  handleShare: function(e) {
    this.props.actions.share(e.value)
  },

  render: function() {
    return <DropdownMenu className="share-menu"
              caret={false}
              component="li"
              options={this.getOptions()}
              title={this.getTitle()}
              onSelect={this.handleShare} />;
  }
});


module.exports = ShareMenu;

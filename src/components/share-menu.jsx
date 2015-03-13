import React from 'react';
import DropdownMenu from './dropdown-menu';
import Icons from './icons';

var ShareMenu = React.createClass({

  getTitle: function() {
    return this.props.title || <span>
      Share <Icons.Share {...this.props.settings} size={13}/>
    </span>;
  },

  getOptions: function() {
    var fb = <span> <Icons.Facebook {...this.props.settings} size={13}/> Facebook</span>
    var tw = <span> <Icons.Twitter {...this.props.settings} size={13}/> Twitter</span>
    return [
      { label: fb, value: 'facebook' },
      { label: tw, value: 'twitter' }
    ];
  },

  handleShare: function(e) {
    this.props.actions.share(e.value)
  },

  render: function() {
    return <DropdownMenu
      className="share-menu"
      component="li"
      right
      options={this.getOptions()}
      title={this.getTitle()}
      onSelect={this.handleShare} />;
  }
});


module.exports = ShareMenu;

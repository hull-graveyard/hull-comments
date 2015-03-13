import React from 'react';
import DropdownMenu from './dropdown-menu';
import Icons from './icons';

var ShareMenu = React.createClass({

  getTitle: function() {
    return this.props.title || <span>
      Share <Icons.Share {...this.props.settings} size={13}/>
    </span>;
  },

  getDefaultProps: function() {
    return {
      right:false
    };
  },

  getOptions: function() {
    var fb = <span className='share-icon'> <Icons.Facebook {...this.props.settings} size={13}/> <span className='show-for-medium-up'>Facebook</span></span>
    var tw = <span className='share-icon'> <Icons.Twitter {...this.props.settings} size={13}/> <span className='show-for-medium-up'>Twitter</span></span>
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
      right={this.props.right}
      options={this.getOptions()}
      title={this.getTitle()}
      onSelect={this.handleShare} />;
  }
});


module.exports = ShareMenu;

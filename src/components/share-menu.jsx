import _ from 'underscore';
import React from 'react';
import DropdownMenu from './dropdown-menu';
import Icons from './icons';

var ShareMenu = React.createClass({

  getTitle: function() {
    return this.props.title || <span>
      Share <Icons.Share settings={this.props.settings} size={13}/>
    </span>;
  },

  getDefaultProps: function() {
    return {
      right:false
    };
  },

  getOptions: function() {
    var networks = ['Facebook', 'Twitter', 'LinkedIn', 'Google', 'Email']
    return _.map(networks, (value)=>{
      var Icon = Icons[value]
      return {
        label: <span className='share-icon'><Icon settings={this.props.settings} size={13}/> </span>,
        value: value.toLowerCase()
      }
    });
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

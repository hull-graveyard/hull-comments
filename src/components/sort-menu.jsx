import DropdownMenu from './dropdown-menu';
import React from 'react';
import capitalize from '../lib/capitalize';

var SortMenu = React.createClass({

  handleChange: function(val) {
    this.props.actions.orderBy(val.value);
  },

  getTitle: function() {
    return capitalize(this.props.orderBy);
  },

  getOptions: function() {
    return ['newest', 'oldest', 'best'].map(function(opt) {
      return { value: opt, label: capitalize(opt) }
    });
  },

  render: function() {
    return <div></div>;
    return <DropdownMenu
      className={{'has-dropdown':true, 'sorting':true}}
      component="li"
      inNavBar={true}
      options={this.getOptions()}
      title={this.getTitle()}
      value={this.props.orderBy}
      onSelect={this.handleChange} />
  }
});

module.exports = SortMenu

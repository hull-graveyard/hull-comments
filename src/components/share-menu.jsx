import _ from '../lib/lodash';
import React from 'react';
import DropdownMenu from './dropdown-menu';
import Icon from './icon';
import { translate } from '../lib/i18n';

var ShareMenu = React.createClass({
  getTitle: function() {
    return this.props.title || <span>{translate('Share')} <Icon name="share"/></span>;
  },

  getDefaultProps: function() {
    return {
      right:false
    };
  },

  getOptions: function() {
    const networks = ['facebook', 'twitter', 'linkedin', 'google', 'email']

    return _.map(networks, (value) => {
      return {
        label: <span className='share-icon'><Icon name={value}/>&nbsp;<span className='show-for-medium-up'>{value}</span></span>,
        value: value.toLowerCase()
      }
    });
  },

  handleShare: function(e) {
    this.props.actions.share(e.value)
  },

  render: function() {
    return <DropdownMenu
      component={this.props.component || 'span'}
      right={this.props.right}
      options={this.getOptions()}
      title={this.getTitle()}
      onSelect={this.handleShare} />;
  }
});

module.exports = ShareMenu;

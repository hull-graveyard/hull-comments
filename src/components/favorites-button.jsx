import React from 'react';
import cx from 'react/lib/cx';
import Icon from './icon';
import { translate } from '../lib/i18n';

var FavoritesButton = React.createClass({
  toggleFavorite: function(e) {
    e.preventDefault();
    this.props.actions.toggleFavorite();
  },

  render: function() {
    if (this.props.user == null) { return null; }

    if (this.props.isFavorite){
      var color = '#FFCC00';
      var style={color:color}
    } else {
      var style={}
    }
    return (
      <li>
        <a href="#" onClick={this.toggleFavorite} style={style}>{this.props.isFavorite ? translate('Liked') : translate('Like')} <Icon name='heart' settings={this.props.settings} size={13} color={color}/></a>
      </li>
    );
  }
});

module.exports = FavoritesButton;

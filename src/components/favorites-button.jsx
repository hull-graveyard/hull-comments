import React from 'react';
import cx from 'react/lib/cx';
import Icon from './icon.jsx';
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
      var linkStyle = {color};
    }
    return (
      <li>
        <a href="#" onClick={this.toggleFavorite} style={linkStyle}>
          {this.props.isFavorite ? translate('Liked') : translate('Like')}
          <Icon name='heart'/>
        </a>
      </li>
    );
  }
});

module.exports = FavoritesButton;

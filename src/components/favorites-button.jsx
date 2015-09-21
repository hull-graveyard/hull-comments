import React from 'react';
import cx from 'classnames';
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
      var color = '#E75F45';
      var linkStyle = {color};
    }
    return (
      <a href="#" onClick={this.toggleFavorite} style={linkStyle}>
        <Icon colorize name='heart'/>
        {this.props.isFavorite ? translate('Liked') : translate('Like')}
      </a>
    );
  }
});

module.exports = FavoritesButton;

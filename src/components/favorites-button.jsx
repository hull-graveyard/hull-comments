import React from 'react';
import Icon from './icon.jsx';
import { translate } from '../lib/i18n';
import styles from '../styles/favorites.scss';
import cssModules from '../lib/cssModules';


const FavoritesButton = React.createClass({
  propTypes: {
    styleName: React.PropTypes.string,
    actions: React.PropTypes.object.isRequired,
    isFavorite: React.PropTypes.bool,
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
  },

  toggleFavorite(event) {
    event.preventDefault();
    this.props.actions.toggleFavorite();
  },

  render() {
    let color;
    let linkStyle;
    if (!this.props.user) { return <noscript/>; }

    if (this.props.isFavorite) {
      color = '#E75F45';
      linkStyle = {color};
    }
    return (
      <a href="#" styleName="link" onClick={this.toggleFavorite} style={linkStyle}>
        <Icon colorize name="heart"/>
        {this.props.isFavorite ? translate('Liked') : translate('Like')}
      </a>
    );
  },
});

module.exports = cssModules(FavoritesButton, styles);

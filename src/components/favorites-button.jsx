import React from 'react';
import Icon from './icon.jsx';
import { translate } from '../lib/i18n';
import styles from '../styles/favorites.scss';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class FavoritesButton extends React.Component {
  static propTypes = {
    styleName: React.PropTypes.string,
    actions: React.PropTypes.object.isRequired,
    isFavorite: React.PropTypes.bool,
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
  }

  handleToggleFavorites = (event) => {
    event.preventDefault();
    this.props.actions.toggleFavorite();
  }

  render() {
    let color;
    let linkStyle;
    if (!this.props.user) { return null; }

    if (this.props.isFavorite) {
      color = '#E75F45';
      linkStyle = {color};
    }
    return (
      <a href="#" styleName="link" onClick={this.handleToggleFavorites} style={linkStyle}>
        <Icon colorize name="heart"/>
        {this.props.isFavorite ? translate('Liked') : translate('Like')}
      </a>
    );
  }
}

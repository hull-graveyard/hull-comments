import React from 'react';
import { translate } from '../lib/i18n';
import styles from '../styles/user.scss';
import cssModules from '../lib/cssModules';

const UserAvatar = cssModules(React.createClass({
  propTypes: {
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
  },
  render() {
    const { user } = this.props;
    return (
      <span>
        <img styleName="avatar" src={user.picture} />
        <span styleName="name">{user.name || user.email || translate('logged in as guest')}</span>
      </span>
    );
  },
}), styles);

module.exports = cssModules(UserAvatar, styles);


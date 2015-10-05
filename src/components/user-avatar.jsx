import React from 'react';
import { translate } from '../lib/i18n';
import styles from '../styles/user-avatar.css';
import cssModules from 'react-css-modules';

@cssModules(styles, {allowMultiple: true})
export default class UserAvatar extends React.Component {

  static propTypes = {
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
  }

  render() {
    const { user } = this.props;
    return (
      <span>
        <img styleName="avatar" src={user.picture} />
        <span styleName="name">{user.name || user.email || translate('logged in as guest')}</span>
      </span>
    );
  }
}

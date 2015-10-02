import React from 'react';
import Icon from './icon.jsx';
import DropdownMenu from './dropdown-menu';
import UserAvatar from './user-avatar';
import { translate } from '../lib/i18n';
import styles from '../styles/user.scss';
import cssModules from '../lib/cssModules';


const UserMenu = React.createClass({
  propTypes: {
    actions: React.PropTypes.object.isRequired,
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
  },

  handleChange(item) {
    switch (item.value) {
    case 'logout':
      this.props.actions.logout();
      break;
    default:
      break;
    }
  },

  login(selected) {
    this.props.actions.login({provider: selected.value});
  },

  render() {
    const { user } = this.props;

    if (!user) { return <noscript />; }

    const options = [
      { label: <span><Icon name="exit"/> {translate('Log out')}</span>, value: 'logout' },
    ];

    return (
      <DropdownMenu right
        options={options}
        onSelect={this.handleChange}
        title={<UserAvatar {...this.props}/>}/>
      );
  },
});

module.exports = cssModules(UserMenu, styles);


import React from 'react';
import Icon from './icon.jsx';
import DropdownMenu from './dropdown-menu';
import UserAvatar from './user-avatar';
import { translate } from '../lib/i18n';
import styles from '../styles/user.scss';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class UserMenu extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
  };

  handleChange = (item) => {
    switch (item.value) {
    case 'logout':
      this.props.actions.logout();
      break;
    default:
      break;
    }
  }

  login(selected) {
    this.props.actions.login({provider: selected.value});
  }

  render() {
    const { user } = this.props;

    if (!user) { return null; }

    const options = [
      { label: <span><Icon name="exit"/> {translate('Log out')}</span>, value: 'logout' },
    ];

    return (
      <DropdownMenu right
        options={options}
        onSelect={this.handleChange}
        title={<UserAvatar user={this.props.user}/>}/>
      );
  }
}

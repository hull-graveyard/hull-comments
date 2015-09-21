import React         from 'react';
import cx            from 'classnames';
import capitalize    from '../lib/capitalize';
import Icon          from './icon.jsx';
import DropdownMenu  from './dropdown-menu';
import Avatar        from './avatar';
import { translate } from '../lib/i18n';
import EmailLogin    from './email-login';

var UserMenu = React.createClass({
  handleChange(item) {
    switch(item.value) {
      case 'logout':
        this.props.actions.logout();
        break;
    }
  },

  login(selected) {
    this.props.actions.login({provider:selected.value});
  },

  render() {
    let { user } = this.props;

    if (user == null) { return <noscript />; }

    let title = (
      <span className='user'>
        <span className="avatar user__avatar"><img src={user.picture} /></span>
        <span className="user__name">{user.name || user.email || translate('logged in as guest')}</span>
      </span>
    );

    let options = [
      { label: <span><Icon name='exit'/> {translate('Log out')}</span>, value: "logout" }
    ];

    return <DropdownMenu className={{'has-dropdown':true, 'user-menu':true}}
      component="li"
      inNavBar={true}
      right={true}
      options={options}
      onSelect={this.handleChange}
      title={title}>
      </DropdownMenu>;
  }
});

module.exports = UserMenu;


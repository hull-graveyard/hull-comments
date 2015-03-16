import React from 'react';
import cx from 'react/lib/cx';
import capitalize from '../lib/capitalize';
import DropdownMenu from './dropdown-menu';

var UserMenu = React.createClass({
  handleChange: function(item) {
    switch(item.value) {
      case 'logout':
        this.props.actions.logout();
        break;
    }
  },

  login: function(selected) {
    this.props.actions.login(selected.value);
  },

  render: function() {
    var user = this.props.user;

    var title;
    var options;
    var action;
    if (user) {
      title = (
        <span className='small-avatar'>
          <img src={user.picture}/>
          <span className="show-for-medium-up">{user.name || user.email || 'logged in as Guest'}</span>
        </span>
      );
      options = [
        { label: "Logout", value: "logout" }
      ];
      action = this.handleChange;
    } else {
      title = 'Login';
      options = this.props.providers.map(function(provider) {
        return { label: capitalize(provider.name), value: provider.name };
      }, this);
      action = this.login;
    }

    return <DropdownMenu className={{'has-dropdown':true, 'user-menu':true}}
      component="li"
      inNavBar={true}
      right={true}
      options={options}
      onSelect={action}
      title={title} />;
  }
});
module.exports = UserMenu;


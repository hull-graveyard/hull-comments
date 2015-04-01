import React from 'react';
import { translate } from '../lib/i18n';
import DropdownMenu from './dropdown-menu';
import Icon from './icon';

const EmailLogin = React.createClass({
  getInitialState() {
    return { newUser: {} };
  },

  signup(e) {
    e.preventDefault();
    this.props.actions.signup(this.state.newUser);
  },

  handleChange(e) {
    var newUser = this.state.newUser || {};
    newUser[e.target.name] = e.target.value;
    this.setState({ newUser: newUser });
  },

  render() {
    var title = [
      <Icon name='email' color="#FFFFFF" size="16"/>,
      translate("Email")
    ];
    return <DropdownMenu component="button" className={this.props.className} title={title} btnClass='button tiny round email left'>
        <div className="register f-dropdown" style={{padding:".6rem 1rem"}}>
          <p className="light-text">Register: </p>
          <p className="input-wrapper">
            <input type="text" placeholder={translate('Name')} name="name" value={this.state.newUser.name} onChange={this.handleChange} />
          </p>

          <p className="input-wrapper">
            <input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
          </p>

          <p className="input-wrapper">
            <input type="password" placeholder={translate('Password')} name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
          </p>

          <button className="tiny button round expand success" onClick={this.signup}>
            <Icon name='check' settings={this.props.settings} color="#FFFFFF"/>
          </button>
        </div>
      </DropdownMenu>;
  }

});

module.exports = EmailLogin;

import Icons from './icons';
import React from 'react';
import { translate } from '../lib/i18n';
import DropdownMenu from './dropdown-menu';

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
    return <DropdownMenu component="li" className={this.props.className} title="Email Login" btnClass='button tiny expand round success'>
        <div className="register dropdown" style={{padding:".6rem 1rem"}}>
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

          <button className="small button round expand success" onClick={this.signup}>
            <Icons.Check settings={this.props.settings} color="#FFFFFF"/>
          </button>
        </div>
      </DropdownMenu>;
  }

});

module.exports = EmailLogin;

import React from 'react';
import cx from 'react/lib/cx';
import Icons from './icons';
import _ from 'underscore';
import { translate } from '../lib/i18n';

var LoginForm = React.createClass({
  getInitialState() {
    return { newUser: {} };
  },

  login(providerName) {
    this.props.actions.login(providerName);
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

  renderSocialLogin(){
    var providers = this.props.providers;
    if(providers.length){
      var gridClassName=`small-block-grid-${Math.min(providers.length,3)}`
    }
    return <div className="connect">
      <p className='light-text text-center text-uppercase'><strong><small className='light-text'>{translate('Sign in with')}</small></strong></p>
      <ul className={gridClassName}>
        {this.props.providers.map(function(provider) {
          var providerName = _.str.titleize(provider.name)
          var btnClasses = {
            'button':true,
            'tiny':true,
            'expand':true,
            'round':true,
            [provider.name]:true
          }
          var Icon = Icons[providerName]
          var icon = Icon ? <Icon settings={this.props.settings} color="#FFFFFF"/> : null;
          return <li key={provider.name} className={"auth-" + provider.name}>
            <a href="#" className={cx(btnClasses)} style={{margin:0}} onClick={this.login.bind(this, provider.name)}>{icon} <strong className='show-for-small-up'>{providerName}</strong></a>
          </li>;
        }, this)}
      </ul>
    </div>;
  },

  renderEmailLogin(){
    return <div>
      <div className="register">
        <p className='light-text text-center text-uppercase'><strong><small>{translate('Or register:')}</small></strong></p>
        <p className="input-wrapper">
          <input dir="auto" type="text" placeholder={translate('Name')} name="name" value={this.state.newUser.name} maxLength="30" onChange={this.handleChange} />
        </p>

        <div className="register-details">
          <p className="input-wrapper">
            <input dir="auto" type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
          </p>
          <p className="input-wrapper">
            <input dir="auto" type="password" placeholder={translate('Password')} name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
          </p>
        </div>
      </div>
      <div className="proceed">
        <button className="small button round expand success" onClick={this.signup}>
          <Icons.Check settings={this.props.settings} color="#FFFFFF"/>
        </button>
      </div>
      </div>
  },

  render() {

    return <section className="auth-section logged-out">
      {this.renderSocialLogin()}
      {this.renderEmailLogin()}
    </section>;
  }
});

module.exports = LoginForm;

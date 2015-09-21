import React from 'react';
import cx from 'classnames';
import Icon from './icon';
import titleize from 'underscore.string/titleize';
import { translate } from '../lib/i18n';

const BUTTON_CLASSES='login-button left button tiny round';
var LoginForm = React.createClass({
  login(providerName, e) {
    e.preventDefault();

    this.props.actions.login({provider:providerName}, 'login_button_facebook');
  },


  toggleForm(e) {
    e.preventDefault();
    this.props.actions.toggleForm();
  },

  renderSocialLogin(){
    return this.props.providers.map(function(provider) {
      var btnClasses = { [BUTTON_CLASSES]:true, [provider.name]:true }
      return <a key={provider.name} className={cx(btnClasses)} onClick={this.login.bind(this, provider.name)}><Icon colorize name={provider.name.toLowerCase()}/></a>
    }, this);
  },

  renderEmailLogin(){
    return <a className={`${BUTTON_CLASSES} primary email`} onClick={this.toggleForm} style={{fontSize:12, fontWeight:700}}><Icon colorize name='send'/>{" "+translate("Email")}</a>
  },

  render() {
    var providers = this.props.providers;
    return <section className="auth-section logged-out">
      {translate('Sign in with')}
      <div className="connect">
        {this.renderEmailLogin()}
        {this.renderSocialLogin(providers)}
      </div>
    </section>;
  }
});

module.exports = LoginForm;

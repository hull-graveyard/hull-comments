import React from 'react';
import cx from 'react/lib/cx';
import Icon from './icon';
import EmailLogin from './email-login';
import titleize from 'underscore.string/titleize';
import { translate } from '../lib/i18n';

var LoginForm = React.createClass({
  login(providerName, e) {
    e.preventDefault();

    this.props.actions.login({provider:providerName}, 'login_button_facebook');
  },

  renderSocialLogin(){
    return this.props.providers.map(function(provider) {
      var btnClasses = {'button':true, 'tiny':true, 'expand':false, 'round':true, 'login':true, [provider.name]:true, "left":true }
      return <a href="#" key={provider.name} className={cx(btnClasses)} style={{marginTop:0,marginBottom:10,marginRight:10}} onClick={this.login.bind(this, provider.name)}>
          <Icon name={provider.name.toLowerCase()} size='16' settings={this.props.settings} color="#FFFFFF"/>
          <strong className='hide-for-large-up show-for-large-up'>{titleize(provider.name)}</strong>
        </a>
    }, this);
  },

  render() {
    var providers = this.props.providers;
    return <section className="auth-section logged-out">
      <div className="connect">
        <p className='light-text text-center text-uppercase'><strong><small className='light-text'>{translate('Sign in with')}</small></strong></p>
        <div>
          {this.renderSocialLogin(providers)}
          <EmailLogin {...this.props} className='auth-email left'/>
        </div>
      </div>
    </section>;
  }
});

module.exports = LoginForm;

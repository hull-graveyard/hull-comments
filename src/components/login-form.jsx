import React from 'react';
import cx from 'react/lib/cx';
import Icons from './icons';
import EmailLogin from './email-login';
import titleize from 'underscore.string/titleize';
import { translate } from '../lib/i18n';

var LoginForm = React.createClass({

  login(providerName) {
    this.props.actions.login(providerName);
  },

  renderSocialLogin(){
    return this.props.providers.map(function(provider) {
      var providerName = titleize(provider.name)
      var btnClasses = {'button':true, 'tiny':true, 'expand':true, 'round':true, [provider.name]:true }
      var Icon = Icons[providerName]
      var icon = Icon ? <Icon settings={this.props.settings} color="#FFFFFF"/> : null;
      return <li key={provider.name} className={"auth-" + provider.name}>
        <a href="#" className={cx(btnClasses)} style={{margin:0}} onClick={this.login.bind(this, provider.name)}>
          {icon} <strong className='show-for-small-up'>{providerName}</strong>
        </a>
      </li>;
    }, this);
  },

  render() {
    var providers = this.props.providers;
    if(providers.length){
      var gridClassName=`small-block-grid-1 medium-block-grid-2 large-block-grid-${Math.min(providers.length+1,4)}`
    }
    return <section className="auth-section logged-out">
      <div className="connect">
        <p className='light-text text-center text-uppercase'><strong><small className='light-text'>{translate('Sign in with')}</small></strong></p>
        <ul className={gridClassName}>
          {this.renderSocialLogin(providers)}
          <EmailLogin {...this.props} className='auth-email'/>
        </ul>
      </div>
    </section>;
  }
});

module.exports = LoginForm;

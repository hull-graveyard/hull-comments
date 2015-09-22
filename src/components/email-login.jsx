import React from 'react';
import cx from 'classnames';
import { translate } from '../lib/i18n';
import DropdownMenu from './dropdown-menu';
import Icon from './icon';
let { Input } = require('react-input-placeholder')(React);
import _ from '../lib/lodash';

const EmailLogin = React.createClass({
  getInitialState() {
    return {
      newUser: {},
      tab:'login'
    };
  },

  showTab(tab, e){
    e.preventDefault();
    this.props.actions.clearErrors()
    this.setState({tab:tab});
  },

  signup(e) {
    e.preventDefault();
    this.props.actions.signup(this.state.newUser);
  },

  login(e) {
    e.preventDefault();
    this.props.actions.login({login:this.state.newUser.email,password:this.state.newUser.password});
  },

  recover(e) {
    e.preventDefault();
    this.props.actions.resetPassword({email:this.state.newUser.email});
  },

  handleChange(e) {
    var newUser = this.state.newUser || {};
    this.props.actions.clearErrors()
    newUser[e.target.name] = e.target.value;
    this.setState({ newUser: newUser });
  },

  renderPrefixedField(icon, field){
    return <div className="row collapse prefix-radius">
      <div className="small-1 columns"><Icon name={icon} size={32}/></div>
      <div className="small-11 columns">{field}</div>
    </div>
  },
  renderButton(action, text){
    return <button className="tiny button round expand success" onClick={action}><strong>{text}</strong></button>
  },

  renderEmailPasswordForm(action){
    var txt = this.state.tab==='login' ? 'Log in' : 'Sign up'
    let password = <Input type="password" placeholder={translate('Password')} name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
    let email = <Input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
    return <span>
      {this.renderPrefixedField('send', email)}
      {this.renderPrefixedField('lock', password)}
      {this.renderButton(action,<Icon name='chevron_right' settings={this.props.settings} colorize size={24}/>)}
    </span>
  },

  renderRecoverForm(){
    if(this.props.status && this.props.status.resetPassword){
      var message = <p className="message-block text-center">
        <small>{translate(this.props.status.resetPassword.message, { email:this.state.newUser.email })}</small>
      </p>
    }
    let email = <Input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange}  />

    return <span>
      {this.renderPrefixedField('send', email)}
      {this.renderButton(this.recover, translate('Send reset link'))}
      {message}
    </span>
  },

  renderNavBar(){
    var isLogin = this.state.tab=='login';
    var isRegister = this.state.tab=='register';
    var isRecover = this.state.tab=='recover';

    return <nav className="top-bar expanded nav-bar">
      <section className="top-bar-section">
        <ul className='tab-full'>
          <li className={cx({'tab-title':true,'active':isLogin})}><a onClick={this.showTab.bind(this,'login')}>{translate('Log in')}</a></li>
          <li className={cx({'tab-title':true,'active':isRegister})}><a onClick={this.showTab.bind(this,'register')}>{translate('Sign up')}</a></li>
        </ul>
      </section>
    </nav>
  },

  getTabStyle() {
    var tab = this.state.tab;
    return _.reduce(['login', 'register', 'recover'], function(m, t) {
      m[t] = { display: t == tab ? 'block' : 'none' }
      return m;
    }, {});
  },

  render() {
    if (!this.props.formIsOpen) { return <noscript/>; }

    var isLogin = this.state.tab == 'login';
    var isRegister = this.state.tab == 'register';
    var isRecover = this.state.tab == 'recover';

    if(this.props.error && this.props.error.provider=='email'){
      var error = <div className="error-block">{this.props.error.message}</div>;
    }

    var styles = this.getTabStyle();
    let userField = <Input type="text" placeholder={translate('Name')} name="name" value={this.state.newUser.name} onChange={this.handleChange} />

    return (
      <div className="register" style={{clear: 'both'}}>
        {this.renderNavBar()}
        {error}

        <div className="tabs-content" style={{padding:"0 1rem"}}>

          <div className={cx({'content':true, 'active':isLogin})} style={styles.login}>
            {this.renderEmailPasswordForm(this.login)}
            <div className="text-center"><strong><a href="#" onClick={this.showTab.bind(this,'recover')}>{translate('Forgot Password?')}</a></strong></div>
          </div>

          <div className={cx({'content':true, 'active':isRecover})} style={styles.recover}>
            {this.renderRecoverForm()}
          </div>

          <div className={cx({'content':true, 'active':isRegister})} style={styles.register}>
            {this.renderPrefixedField('user', userField)}
            {this.renderEmailPasswordForm(this.signup)}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EmailLogin;

import React from 'react';
import cx from 'react/lib/cx';
import { translate } from '../lib/i18n';
import DropdownMenu from './dropdown-menu';
import Icon from './icon';

const EmailLogin = React.createClass({
  getInitialState() {
    return {
      newUser: {},
      tab:'login'
    };
  },

  showTab: function(tab){
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

  renderEmailPasswordForm(action){
    return [
      this.renderEmailField(),
      <p className="input-wrapper">
        <input type="password" placeholder={translate('Password')} name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
      </p>,
      <button className="tiny button round expand success" onClick={action}>
        <Icon name='check' settings={this.props.settings} color="#FFFFFF"/>
      </button>
    ]
  },
  renderRecoverForm(){
    if(this.props.status && this.props.status.resetPassword){
      var message  = <p className="message-block text-center">
        <small>
          {translate(this.props.status.resetPassword.message,{email:this.state.newUser.email})}
        </small>
      </p>
    }
    return [
      this.renderEmailField(),
      <button className="tiny button round expand success" onClick={this.recover}><strong>Send reset link</strong></button>,
      {message}
    ]
  },
  renderEmailField(){
    return <p className="input-wrapper">
      <input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
    </p>
  },
  renderNavBar(){
    var isLogin = this.state.tab=='login';
    var isRegister = this.state.tab=='register';
    var isRecover = this.state.tab=='recover';

    return <nav className="top-bar expanded nav-bar">
      <section className="top-bar-section">
        <ul className='left'>
          <li className={cx({'tab-title':true,'active':isLogin})}><a onClick={this.showTab.bind(this,'login')}>Login</a></li>
          <li className={cx({'tab-title':true,'active':isRegister})}><a onClick={this.showTab.bind(this,'register')}>Register</a></li>
        </ul>
      </section>
    </nav>
  },

  toggleForm(e) {
    e.preventDefault();

    this.setState({ formIsOpen: !this.state.formIsOpen });
  },

  renderForm() {
    if (!this.state.formIsOpen) { return; }

    var isLogin = this.state.tab=='login';
    var isRegister = this.state.tab=='register';
    var isRecover = this.state.tab=='recover';

    if(this.props.error && this.props.error.provider=='email'){
      var error = <p className="error-block text-center">{this.props.error.message}</p>;
    }

    return (
      <div className="register" style={{clear: 'both'}}>
        {this.renderNavBar()}
        <div className="tabs-content" style={{padding:"0 1rem"}}>
          <div className={cx({'content':true, 'active':isLogin})} id="loginTab">
            {this.renderEmailPasswordForm(this.login)}
            <strong  className='text-center'><small><a href="#" onClick={this.showTab.bind(this,'recover')}>{translate('Forgot Password?')}</a></small></strong>
          </div>
          <div className={cx({'content':true, 'active':isRecover})} id="loginTab">
            {this.renderRecoverForm()}
          </div>
          <div className={cx({'content':true, 'active':isRegister})} id="registerTab">
            <p className="input-wrapper">
              <input type="text" placeholder={translate('Name')} name="name" value={this.state.newUser.name} onChange={this.handleChange} />
            </p>
            {this.renderEmailPasswordForm(this.signup)}
          </div>
          {error}
        </div>
      </div>
    );
  },

  render() {
    var title = [ <Icon name='email' color="#FFFFFF" size="16"/>, translate("Email") ];

    return (
      <span>
        <button className='button tiny round email left' onClick={this.toggleForm}>{title}</button>
        {this.renderForm()}
      </span>
    );
  }
});

module.exports = EmailLogin;

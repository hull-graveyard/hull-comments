import React from 'react';
import cx from 'classnames';
import { translate } from '../lib/i18n';
import Icon from './icon';
const { Input } = require('react-input-placeholder')(React);
import _ from '../lib/lodash';
import styles from '../styles/main.scss';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class EmailLogin extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
    status: React.PropTypes.object,
    actions: React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired,
    formIsOpen: React.PropTypes.bool,
  }

  state = {newUser: {}, tab: 'login'};

  getTabStyle() {
    const tab = this.state.tab;
    return _.reduce(['login', 'register', 'recover'], function(m, t) {
      m[t] = { display: t === tab ? 'block' : 'none' };
      return m;
    }, {});
  }

  handleRecover = (event) => {
    event.preventDefault();
    this.props.actions.resetPassword({email: this.state.newUser.email});
  }

  handleLogin = (event) => {
    event.preventDefault();
    this.props.actions.login({login: this.state.newUser.email, password: this.state.newUser.password});
  }

  handleSignup = (event) => {
    event.preventDefault();
    this.props.actions.signup(this.state.newUser);
  }

  handleShowTab = (tab, event) => {
    event.preventDefault();
    this.props.actions.clearErrors();
    this.setState({tab: tab});
  }

  handleChange = (event) => {
    const newUser = this.state.newUser || {};
    this.props.actions.clearErrors();
    newUser[event.target.name] = event.target.value;
    this.setState({ newUser: newUser });
  }

  renderNavBar() {
    const tab = this.state.tab;
    const isLogin = (tab === 'login');
    const isRegister = (tab === 'register');

    return (
      <nav className="top-bar expanded nav-bar">
        <section className="top-bar-section">
          <ul className="tab-full">
            <li className={cx({'tab-title': true, 'active': isLogin})}><a onClick={this.handleShowTab.bind(this, 'login')}>{translate('Log in')}</a></li>
            <li className={cx({'tab-title': true, 'active': isRegister})}><a onClick={this.handleShowTab.bind(this, 'register')}>{translate('Sign up')}</a></li>
          </ul>
        </section>
      </nav>
    );
  }

  renderPrefixedField(icon, field) {
    return (
      <div className="row collapse prefix-radius">
        <div className="small-1 columns"><Icon name={icon} size={32}/></div>
        <div className="small-11 columns">{field}</div>
      </div>
    );
  }

  renderButton(action, text) {
    return <button className="tiny button round expand success" onClick={action}><strong>{text}</strong></button>;
  }

  renderEmailPasswordForm(action) {
    const password = <Input type="password" placeholder={translate('Password')} name="password" value={this.state.newUser.password} onChange={this.handleChange} />;
    const email = <Input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange} />;
    return (
      <span>
        {this.renderPrefixedField('send', email)}
        {this.renderPrefixedField('lock', password)}
        {this.renderButton(action, <Icon name="chevron_right" settings={this.props.settings} colorize size={24}/>)}
      </span>
    );
  }

  renderRecoverForm() {
    let message;
    if (this.props.status && this.props.status.resetPassword) {
      message = (
        <p className="message-block text-center">
          <small>{translate(this.props.status.resetPassword.message, { email: this.state.newUser.email })}</small>
        </p>
      );
    }
    const email = <Input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange} />;

    return (
      <span>
        {this.renderPrefixedField('send', email)}
        {this.renderButton(this.handleRecover, translate('Send reset link'))}
        {message}
      </span>
    );
  }

  render() {
    let error;
    if (!this.props.formIsOpen) { return null; }

    const tab = this.state.tab;
    const isLogin = (tab === 'login');
    const isRegister = (tab === 'register');
    const isRecover = (tab === 'recover');

    if (this.props.error && this.props.error.provider === 'email') {
      error = <div className="error-block">{this.props.error.message}</div>;
    }

    const tabStyles = this.getTabStyle();
    const userField = <Input type="text" placeholder={translate('Name')} name="name" value={this.state.newUser.name} onChange={this.handleChange} />;

    return (
      <div className="register" style={{clear: 'both'}}>
        {this.renderNavBar()}
        {error}

        <div className="tabs-content" style={{padding: '0 1rem'}}>

          <div className={cx({content: true, active: isLogin})} style={tabStyles.login}>
            {this.renderEmailPasswordForm(this.handleLogin)}
            <div className="text-center"><strong><a href="#" onClick={this.handleShowTab.bind(this, 'recover')}>{translate('Forgot Password?')}</a></strong></div>
          </div>

          <div className={cx({content: true, active: isRecover})} style={tabStyles.recover}>
            {this.renderRecoverForm()}
          </div>

          <div className={cx({content: true, active: isRegister})} style={tabStyles.register}>
            {this.renderPrefixedField('user', userField)}
            {this.renderEmailPasswordForm(this.handleSignup)}
          </div>
        </div>
      </div>
    );
  }
}

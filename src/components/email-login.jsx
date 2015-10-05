import React from 'react';
import cx from 'classnames';
import { translate } from '../lib/i18n';
import Icon from './icon';
const { Input } = require('react-input-placeholder')(React);
import styles from '../styles/email-login.scss';
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
      <nav styleName="tab-bar">
        <ul styleName="tab-list">
          <li styleName={cx({'tab-link': true, 'active': isLogin})}><a className="light-text" onClick={this.handleShowTab.bind(this, 'login')}>{translate('Log in')}</a></li>
          <li styleName={cx({'tab-link': true, 'active': isRegister})}><a className="light-text" onClick={this.handleShowTab.bind(this, 'register')}>{translate('Sign up')}</a></li>
        </ul>
      </nav>
    );
  }

  renderPrefixedField(icon, field) {
    return (
      <div styleName="row">
        <div styleName="icon"><Icon name={icon} size={32}/></div>
        <div styleName="field">{field}</div>
      </div>
    );
  }

  renderButton(action, text) {
    return <button styleName="action-button" onClick={action}>{text}</button>;
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
        <p styleName="message">
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
      error = <div styleName="error">{this.props.error.message}</div>;
    }

    const userField = <Input type="text" placeholder={translate('Name')} name="name" value={this.state.newUser.name} onChange={this.handleChange} />;

    return (
      <div styleName="register">
        {this.renderNavBar()}
        {error}

        <div styleName="tabs">

          <div styleName={cx({tab: true, active: isLogin})}>
            {this.renderEmailPasswordForm(this.handleLogin)}
            <div styleName="center"><strong><a className="link" href="#" onClick={this.handleShowTab.bind(this, 'recover')}>{translate('Forgot Password?')}</a></strong></div>
          </div>

          <div styleName={cx({tab: true, active: isRecover})}>
            {this.renderRecoverForm()}
          </div>

          <div styleName={cx({tab: true, active: isRegister})}>
            {this.renderPrefixedField('user', userField)}
            {this.renderEmailPasswordForm(this.handleSignup)}
          </div>
        </div>
      </div>
    );
  }
}

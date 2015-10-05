import React from 'react';
import cx from 'classnames';
import Icon from './icon';
import { translate } from '../lib/i18n';
import styles from '../styles/login-form.scss';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class LoginForm extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    providers: React.PropTypes.array.isRequired,
  }

  login(providerName, e) {
    e.preventDefault();
    this.props.actions.login({provider: providerName}, 'login_button_facebook');
  }


  handleToggleForm = (e) => {
    e.preventDefault();
    this.props.actions.toggleForm();
  }

  renderSocialLogin() {
    return this.props.providers.map(function(provider) {
      const btnClasses = { button: true, login: true, [provider.name]: true };
      return <a key={provider.name} styleName={cx(btnClasses)} onClick={this.login.bind(this, provider.name)}><Icon size={24} colorize name={provider.name.toLowerCase()}/></a>;
    }, this);
  }

  renderEmailLogin() {
    return <a className="button" styleName="button email" onClick={this.handleToggleForm}><Icon size={24} colorize name="send"/>{` ${translate('Email')}`}</a>;
  }

  render() {
    const { providers } = this.props;
    return (
      <section styleName="auth">
        <p>{translate('Sign in with')}</p>
        <div>
          {this.renderEmailLogin()}
          {this.renderSocialLogin(providers)}
        </div>
      </section>
    );
  }
}


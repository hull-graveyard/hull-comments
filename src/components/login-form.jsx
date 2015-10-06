import React from 'react';
import cx from 'classnames';
import Icon from './icon';
import EmailForm from './email-form';
import { translate } from '../lib/i18n';
import styles from '../styles/login-form.css';
import cssModules from 'react-css-modules';
import _ from 'lodash';


@cssModules(styles, {allowMultiple: true})
export default class LoginForm extends React.Component {

  static propTypes = {
    user: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.oneOf([null]),
    ]),
    actions: React.PropTypes.object.isRequired,
    providers: React.PropTypes.array.isRequired,
  }

  state = { formIsOpen: false }

  handleLogin(providerName, e) {
    e.preventDefault();
    this.props.actions.login({provider: providerName}, 'login_button_facebook');
  }


  handleToggleForm = (e) => {
    e.preventDefault();
    this.setState({formIsOpen: !this.state.formIsOpen});
  }

  renderSocialLogin() {
    return this.props.providers.map(function(provider) {
      const btnClasses = { button: true, login: true, [provider.name]: true };
      return <a key={provider.name} styleName={cx(btnClasses)} onClick={this.handleLogin.bind(this, provider.name)}><Icon colorize name={provider.name.toLowerCase()}/></a>;
    }, this);
  }

  renderEmailLogin() {
    return <a className="button" styleName="button email" onClick={this.handleToggleForm}><Icon colorize name="send"/>{` ${translate('Email')}`}</a>;
  }

  renderEmailForm(props) {
    if (!this.state.formIsOpen || this.props.user !== null ) { return null; }
    return <EmailForm {...props}/>;
  }

  render() {
    const props = _.omit(this.props, 'styles');
    return (
      <section styleName="auth">
        <p>{translate('Sign in with')}</p>
        <div>
          {this.renderEmailLogin()}
          {this.renderSocialLogin(props.providers)}
        </div>
        {this.renderEmailForm(props)}
      </section>
    );
  }
}


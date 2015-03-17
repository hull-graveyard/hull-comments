import React from 'react';
import cx from 'react/lib/cx';
import Icons from './icons';
import _ from 'underscore';

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
    console.warn('change: ', newUser);
    this.setState({ newUser: newUser });
  },

  renderSocialLogin(){
    var providers = this.props.providers;
    if(providers.length){
      var gridClassName=`small-block-grid-${providers.length}`
    }
    return <div className="connect">
      <p className='light-text text-center'><strong><small className='light-text'>SIGN IN WITH</small></strong></p>
      <ul className={gridClassName}>
        {this.props.providers.map(function(provider) {
          var providerName = _.str.titleize(provider.name)
          var btnClasses = {
            'button':true,
            'expand':true,
            'round':true,
            [provider.name]:true
          }
          var Icon = Icons[providerName]
          return <li className={"auth-" + provider.name}>
            <a href="#" className={cx(btnClasses)} onClick={this.login.bind(this, provider.name)}><Icon settings={this.props.settings} color="#FFFFFF"/> <strong>{providerName}</strong></a>
          </li>;
        }, this)}
      </ul>
    </div>;
  },
  renderEmailLogin(){
    return <div>
      <div className="register">
        <p className='light-text text-center'><strong><small> OR REGISTER:</small></strong></p>
        <p className="input-wrapper">
          <input dir="auto" type="text" placeholder="Name" name="name" value={this.state.newUser.name} maxLength="30" onChange={this.handleChange} />
        </p>

        <div className="register-details">
          <p className="input-wrapper">
            <input dir="auto" type="email" placeholder="Email" name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
          </p>
          <p className="input-wrapper">
            <input dir="auto" type="password" placeholder="Password" name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
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

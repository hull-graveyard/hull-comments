import React from 'react';
import cx from 'react/lib/cx';
import { translate } from '../lib/i18n';
import DropdownMenu from './dropdown-menu';
import Icon from './icon';

const EmailLogin = React.createClass({
  getInitialState() {
    return {
      newUser: {},
      tab:'register'
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

  handleChange(e) {
    var newUser = this.state.newUser || {};
    newUser[e.target.name] = e.target.value;
    this.setState({ newUser: newUser });
  },

  render() {
    var title = [
      <Icon name='email' color="#FFFFFF" size="16"/>,
      translate("Email")
    ];
    var isLogin = this.state.tab=='login';
    return <DropdownMenu component="button" className={this.props.className} title={title} btnClass='button tiny round email left'>
        <div className="register f-dropdown">
          <nav className="top-bar expanded nav-bar">
            <section className="top-bar-section">
              <ul className='left'>
                <li className={cx({'tab-title':true,'active':isLogin})}><a onClick={this.showTab.bind(this,'login')}>Login</a></li>
                <li className={cx({'tab-title':true,'active':!isLogin})}><a onClick={this.showTab.bind(this,'register')}>Register</a></li>
              </ul>
            </section>
          </nav>

          <div className="tabs-content" style={{padding:"0 1rem"}}>
            <div className={cx({'content':true, 'active':isLogin})} id="loginTab">
              <p className="input-wrapper">
                <input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
              </p>

              <p className="input-wrapper">
                <input type="password" placeholder={translate('Password')} name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
              </p>

              <button className="tiny button round expand success" onClick={this.login}>
                <Icon name='check' settings={this.props.settings} color="#FFFFFF"/>
              </button>

            </div>
            <div className={cx({'content':true, 'active':!isLogin})} id="registerTab">
              <p className="input-wrapper">
                <input type="text" placeholder={translate('Name')} name="name" value={this.state.newUser.name} onChange={this.handleChange} />
              </p>

              <p className="input-wrapper">
                <input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
              </p>

              <p className="input-wrapper">
                <input type="password" placeholder={translate('Password')} name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
              </p>

              <button className="tiny button round expand success" onClick={this.signup}>
                <Icon name='check' settings={this.props.settings} color="#FFFFFF"/>
              </button>
            </div>
          </div>
        </div>
      </DropdownMenu>;
  }

});

module.exports = EmailLogin;

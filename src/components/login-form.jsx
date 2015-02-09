var React = require('react');
var cx = require('react/lib/cx');

var LoginForm = React.createClass({

  getInitialState: function() {
    return { newUser: {} };
  },

  login: function(providerName) {
    this.props.actions.login(providerName);
  },

  signup: function(e) {
    e.preventDefault();
    this.props.actions.signup(this.state.newUser);
  },

  handleChange: function(e) {
    var newUser = this.state.newUser || {};
    newUser[e.target.name] = e.target.value;
    console.warn('change: ', newUser);
    this.setState({ newUser: newUser });
  },

  render: function() {

    var providers = this.props.providers;

    return <div data-role="login-form"><div><section className="auth-section logged-out">
      <div className="connect">
        <h6>Sign in with</h6>
        <ul data-role="login-menu" className="services login-buttons">
          {this.props.providers.map(function(provider) {
            return <li className={"auth-" + provider.name}>
              <button type="button" onClick={this.login.bind(this, provider.name)}>
                <i className={"icon-" + provider.name + "-circle"} />
              </button>
            </li>;
          }, this)}
        </ul>
      </div>
      <div className="guest">
        <h6 className="guest-form-title">
        or register
        </h6>
        <p className="input-wrapper">
          <input dir="auto" type="text" placeholder="Name" name="name" value={this.state.newUser.name} maxLength="30" onChange={this.handleChange} />
        </p>
        <div className="guest-details  expanded" data-role="guest-details">
          <p className="input-wrapper">
            <input dir="auto" type="email" placeholder="Email" name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
          </p>
          <p className="input-wrapper">
            <input dir="auto" type="password" placeholder="Password" name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
          </p>
        </div>
      </div>
      <div className="proceed">
        <button type="submit" className="btn submit" aria-label="Next" onClick={this.signup}><span className="icon-proceed"></span></button>
      </div>
    </section>
    </div></div>;
  }
});

module.exports = LoginForm;

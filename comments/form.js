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


var CommentForm = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    onSubmit: React.PropTypes.func,
    inReplyToId: React.PropTypes.string,
    text: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    mode: React.PropTypes.string,
    comment: React.PropTypes.object
  },

  getInitialState: function() {
    var text = this.props.comment ? this.props.comment.description : "";
    return { text: text || "", isExpanded: this.props.expanded };
  },

  componentDidMount: function() {
    if (this.props.focus) {
      this.refs.textarea.getDOMNode().focus();
    }
  },

  onSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text;
    if (text && text.length) {
      if (this.props.mode === 'edit') {
        this.props.actions.updateComment(text, this.props.comment.id);
      } else {
        this.props.actions.postComment(text, this.props.inReplyToId);
      }
      if (this.props.onSubmit) { this.props.onSubmit(text); }
    }
    this.setState({ text: "" });
  },

  handleKeyDown: function(e) {
    if (e.metaKey && e.keyCode === 13) {
      this.onSubmit(e);
    }
  },

  handleChange: function(e) {
    var text = e.target.textContent;
    this.setState({ text: text });
  },

  dismissError: function() {
    // debugger
  },

  renderError: function() {
    if (this.props.errorMessage) {
      return <div className="alert error" role="alert">
        <a className="close" onClick={this.dismissError} title="Dismiss">×</a>
        <span>{this.props.errorMessage}</span>
      </div>
    }
  },

  renderAvatar: function() {
    if (this.props.mode !== 'edit') {
      var picture = this.props.user ? this.props.user.picture : "http://hull.s3.amazonaws.com/avatar.png"
      return (
        <div className="avatar">
          <a className="user">
            <img src={picture} />
          </a>
        </div>
      );
    }
  },

  expandForm: function(e) {
    if (!this.state.isExpanded) {
      this.setState({ isExpanded: true });
    }
  },

  handleCancel: function(e) {
    e.preventDefault();
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel(e);
    }
  },

  renderButtons: function() {
    var user = this.props.user || {};
    if (this.props.mode === 'edit') {
      return <div className="temp-post">
        <a href="#" className="cancel" onClick={this.handleCancel}>Cancel</a>
        <button className="btn" onClick={this.onSubmit}>Save Edit</button>
      </div>;
    } else {
      return  <div className="temp-post" style={{textAlign: "right"}}>
        <button className="btn" onClick={this.onSubmit}>
          Post as <span data-role="username">{user.name}</span>
        </button>
      </div>;
    }
  },

  renderTextarea: function() {
    var user = this.props.user || {};
    return (
      <div className="textarea-wrapper" data-role="textarea" dir="auto">
        <div ref="textarea" className="textarea"
          dangerouslySetInnerHTML={{__html: this.state.text}}
          onKeyUp={this.handleChange}
          onFocus={this.expandForm}
          contentEditable="true"
          tabIndex="0"
          style={{overflow: "auto", maxHeight: 350 }}
          placeholder='Join the discussion...'>
        </div>
        <div className="post-actions">
          <div className={cx({"logged-in" : !!this.props.user, "auth-section": !this.props.user })}>
            <section>{this.renderButtons()}</section>
          </div>
        </div>
      </div>
    );
  },

  renderLoginForm: function() {
    if (!this.props.user && this.props.mode !== 'edit') {
      return <LoginForm {...this.props} />;
    }
  },

  render: function() {
    var editMode = this.props.mode === 'edit';

    var className = cx({
      reply: !editMode,
      edit: editMode,
      authenticated: !!this.props.user,
      expanded: this.state.isExpanded
    });
    return <form className={className}>
      {this.renderError()}
      <div className={cx({ postbox: !editMode })}>
        {this.renderAvatar()}
        {this.renderTextarea()}
        {this.renderLoginForm()}
      </div>
    </form>;
  }

});


module.exports = CommentForm;

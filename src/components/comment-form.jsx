import React from 'react';
import ContentEditable from "./contenteditable";
import cx from 'react/lib/cx';
import LoginForm from './login-form';

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
    var text = e.target.value;
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

  expandForm: function(e) {
    if (this.props.expanded || !this.state.isExpanded) {
      this.setState({ isExpanded: true });
    }
  },
  contractForm: function(e) {
    if (!this.props.expanded && this.state.isExpanded) {
      this.setState({ isExpanded: false });
    }
  },

  handleCancel: function(e) {
    e.preventDefault();
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel(e);
    }
  },

  renderButtons: function() {
    var user = this.props.user;
    if (user)  {
      if (this.props.mode === 'edit') {
        var actions = [
          <a href="#" className="tiny button radius transparent text-text" onClick={this.handleCancel}>Cancel</a>,
          <button className="tiny button radius strong" onClick={this.onSubmit}>Update</button>
        ]
      } else {
        var actions=[
          <button className="tiny button radius" onClick={this.onSubmit}><strong>Post as {user.name}</strong></button>
        ]
      }
    }
    return actions
  },

  renderTextarea: function() {
    var user = this.props.user || {};
    return (
      <div className="comment-form-editor">
        <ContentEditable
          ref="textarea"
          className="textarea"
          html={this.state.text}
          tabIndex="0"
          placeholder='What do you think?'
          onFocus={this.expandForm}
          onBlur={this.contractForm}
          onChange={this.handleChange}/>
        <div className="comment-form-actions">
          <div className={cx({"logged-in" : !!this.props.user, "right":true, "auth-section": !this.props.user })}>
            {this.renderButtons()}
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
      'comment-form' : true,
      'edit'         : editMode,
      'reply'        : !editMode,
      'authenticated': !!this.props.user,
      'expanded'     : this.state.isExpanded
    });
    return <form className={className}>
      {this.renderError()}
      {this.renderTextarea()}
      {this.renderLoginForm()}
    </form>;
  }
});


module.exports = CommentForm;

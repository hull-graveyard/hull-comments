import React from 'react';
import ContentEditable from "./contenteditable";
import cx from 'classnames';
import LoginForm from './login-form';
import Icon from './icon';
import { translate } from '../lib/i18n';

var CommentForm = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    parentId: React.PropTypes.string,
    text: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    mode: React.PropTypes.string,
    comment: React.PropTypes.object
  },

  getInitialState() {
    var t;
    if (this.props.mode === 'reply') {
      t = '';
    } else {
      t = this.props.comment ? this.props.comment.description : '';
    }

    return { text: t, isExpanded: this.props.expanded };
  },

  componentDidMount() {
    if (this.props.focus) {
      this.refs.textarea.getDOMNode().focus();
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    var text = this.state.text;
    if (text && text.length) {
      if (this.props.mode === 'edit') {
        this.props.actions.updateComment(text, this.props.comment.id);
      } else {
        this.props.actions.postComment(text, this.props.parentId);
      }
      if (this.props.onSubmit) { this.props.onSubmit(text); }
    }
    this.setState({ text: "" });
  },

  handleKeyDown(e) {
    if (e.metaKey && e.keyCode === 13) {
      this.handleSubmit(e);
    }
  },

  handleChange(e) {
    var text = e.target.value;
    this.setState({ text: text });
  },

  renderError() {
    if (this.props.errorMessage) {
      return <div className="alert error" role="alert">
        <a className="close" onClick={this.dismissError} title={translate('Dismiss')}>×</a>
        <span>{this.props.errorMessage}</span>
      </div>
    }
  },

  expandForm(e) {
    if (this.props.expanded || !this.state.isExpanded) {
      this.setState({ isExpanded: true });
    }
  },

  contractForm(e) {
    if (!this.props.expanded && this.state.isExpanded) {
      this.setState({ isExpanded: false });
    }
  },

  handleCancel(e) {
    e.preventDefault();
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel(e);
    }
  },
  renderCancelButton(){
    return <a key='cancel' href='#' className='tiny button link' onClick={this.handleCancel}><strong>{translate('Cancel')}</strong></a>
  },
  renderUpdateButton(){
    return <a key='update' className='tiny button radius' onClick={this.handleSubmit}><strong>{translate('Update')}</strong></a> 
  },
  renderReplyButton(){
    return <a key='reply' className='tiny button radius' onClick={this.handleSubmit}><strong><Icon colorize style={{width:12}} name='reply'/>{translate('Reply')}</strong></a>
  },
  renderPostButton(user){
    var name = (user && (user.name || user.email)) || translate('Guest');
    var t = translate('Post as {name}', { name: name });
    return <a className='tiny button radius' onClick={this.handleSubmit}><strong>{t}</strong></a>;
  },

  renderActions(user, mode='', allow_guest=false) {
    let actions;

    if (user && mode === 'edit') {
      actions = <span>{this.renderCancelButton()} {this.renderUpdateButton()}</span>;

    } else if (user && mode === 'reply') {
      actions = <span>{this.renderCancelButton()} {this.renderReplyButton()}</span>;

    } else if (allow_guest || user) {
      actions = this.renderPostButton(user)
    }

    return <div className="comment-composer__actions">
      <div className={cx({"logged-in" : !!user, "right":true, "auth-section": !user })}>
        {actions}
      </div>
    </div>

  },

  renderTextarea(user={}, mode='') {
    let placeholder = mode === 'reply' ? 'Reply...' : 'What do you think?';
    return <div className={`editor ${(!this.state.text)?'placeholder':''}`}>
      <ContentEditable ref="textarea"
        className="textarea"
        html={this.state.text}
        tabIndex="0"
        placeholder={translate(placeholder)}
        onFocus={this.expandForm}
        onBlur={this.contractForm}
        onChange={this.handleChange}/>
    </div>
  },

  renderLoginForm() {
    if (!this.props.user && this.props.mode !== 'edit') {
      return <LoginForm {...this.props} />;
    }
  },

  render() {
    let { user, mode } =  this.props;
    let editMode = this.props.mode === 'edit';

    let className = cx({
      'comment-composer__form' : true,
      'edit'         : editMode,
      'reply'        : !editMode,
      'authenticated': !!this.props.user,
      'expanded'     : this.state.isExpanded
    });


    return (
      <form className={className}>
        {this.renderError()}
        <div className={`comment-composer__editor ${(editMode)?'comment-composer__editor--editing':''}`}>
          {this.renderTextarea(user)}
          {this.renderActions(user, mode, this.props.settings.allow_guest)}
        </div>
        {this.renderLoginForm()}
      </form>
    );
  }
});


module.exports = CommentForm;

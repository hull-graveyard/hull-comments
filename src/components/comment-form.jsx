import React from 'react';
import ContentEditable from './contenteditable';
import cx from 'classnames';
import LoginForm from './login-form';
import Icon from './icon';
import { translate } from '../lib/i18n';
import styles from '../styles/comment-form.scss';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class CommentForm extends React.Component {

  static propTypes = {
    focus: React.PropTypes.bool,
    user: React.PropTypes.object,
    settings: React.PropTypes.shape({
      allow_guest: React.PropTypes.bool,
    }).isRequired,
    onSubmit: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    parentId: React.PropTypes.string,
    text: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    mode: React.PropTypes.string,
    comment: React.PropTypes.object,
    actions: React.PropTypes.object,
    errorMessage: React.PropTypes.string,
  }

  state = {
    text: ((this.props.mode === 'reply' || !this.props.comment) ? '' : this.props.comment.description),
    isExpanded: this.props.expanded,
  };

  componentDidMount() {
    if (this.props.focus) {
      this.refs.textarea.getDOMNode().focus();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const text = this.state.text;
    if (text && text.length) {
      if (this.props.mode === 'edit') {
        this.props.actions.updateComment(text, this.props.comment.id);
      } else {
        this.props.actions.postComment(text, this.props.parentId);
      }
      if (this.props.onSubmit) { this.props.onSubmit(text); }
    }
    this.setState({ text: '' });
  }

  handleKeyDown = (event) => {
    if (event.metaKey && event.keyCode === 13) {
      this.handleSubmit(event);
    }
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  }

  handleCancel = (event) => {
    event.preventDefault();
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel(event);
    }
  }

  contractForm = () => {
    if (!this.props.expanded && this.state.isExpanded) {
      this.setState({ isExpanded: false });
    }
  }
  expandForm = () => {
    if (this.props.expanded || !this.state.isExpanded) {
      this.setState({ isExpanded: true });
    }
  }

  handleDismissError = () => {
    // TODO
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert error" role="alert">
          <a className="close" onClick={this.handleDismissError} title={translate('Dismiss')}>×</a>
          <span>{this.props.errorMessage}</span>
        </div>
      );
    }
  }

  renderCancelButton() {
    return <a key="cancel" href="#" className="link" onClick={this.handleCancel}><strong>{translate('Cancel')}</strong></a>;
  }
  renderUpdateButton() {
    return <a key="update" className="button" onClick={this.handleSubmit}><strong>{translate('Update')}</strong></a>;
  }
  renderReplyButton() {
    return <a key="reply" className="button" onClick={this.handleSubmit}><strong><Icon colorize size={12} name="reply"/>{translate('Reply')}</strong></a>;
  }
  renderPostButton(user) {
    const name = (user && (user.name || user.email)) || translate('Guest');
    return <a className="button" onClick={this.handleSubmit}><strong>{translate('Post as {name}', { name: name })}</strong></a>;
  }

  renderActions(user, mode = '', allowGuest = false) {
    let actions;

    if (user && mode === 'edit') {
      actions = <span>{this.renderCancelButton()} {this.renderUpdateButton()}</span>;
    } else if (user && mode === 'reply') {
      actions = <span>{this.renderCancelButton()} {this.renderReplyButton()}</span>;
    } else if (allowGuest || user) {
      actions = this.renderPostButton(user);
    }

    return (
      <div styleName={cx({right: true, auth: !user })}>
        {actions}
      </div>
    );
  }

  renderTextarea(user = {}, mode = '') {
    const placeholder = mode === 'reply' ? 'Reply...' : 'What do you think?';
    return (
      <div styleName={cx({editor: true})} className={cx({'light-text': !this.state.text, 'placeholder': !this.state.text})}>
        <ContentEditable ref="textarea"
          html={this.state.text}
          tabIndex="0"
          placeholder={translate(placeholder)}
          onFocus={this.expandForm}
          onBlur={this.contractForm}
          onChange={this.handleChange}/>
      </div>
    );
  }

  renderLoginForm() {
    if (!this.props.user && this.props.mode !== 'edit') {
      return <LoginForm {...this.props} />;
    }
  }

  render() {
    const { user, mode } = this.props;
    const editMode = this.props.mode === 'edit';

    const styleName = cx({
      form: true,
      edit: editMode,
      reply: !editMode,
      authenticated: !!this.props.user,
      expanded: this.state.isExpanded,
    });


    return (
      <form styleName={cx(styleName)}>
        {this.renderError()}
        <div styleName={cx({editor: true, editing: !!editMode})}>
          {this.renderTextarea(user)}
          {this.renderActions(user, mode, this.props.settings.allow_guest)}
        </div>
        {this.renderLoginForm()}
      </form>
    );
  }
}


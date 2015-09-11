import React from 'react';
import cx from 'react/lib/cx';
import CommentForm from './comment-form';
import ShareMenu from './share-menu';
import CommentMeta from './comment-meta';
import Avatar from './avatar';
import CommentFooter from './comment-footer';
import sanitize from 'sanitize-caja';
import { translate } from '../lib/i18n';
import _ from 'underscore';

var SingleComment = React.createClass({
  getInitialState: function() {
    return { showReplyForm: false, isCollapsed: false };
  },

  handleToggleReply: function(e) {
    e.preventDefault();
    this.setState({ showReplyForm: !this.state.showReplyForm });
  },

  toggleCollapse: function(e) {
    e.preventDefault();
    this.setState({ isCollapsed: !this.state.isCollapsed });
  },

  isCurrentUser: function() {
    var commentUser = (this.props.comment || {}).user || {};
    var currentUser = (this.props.user || {});
    return commentUser.id === currentUser.id;
  },

  toggleEdit: function(e) {
    if (e && e.preventDefault) e.preventDefault();

    this.setState({
      isEditing: !this.state.isEditing
    });
  },

  toggleReply: function(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ isReplying: !this.state.isReplying });
  },

  closeReply: function(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ isReplying: false });
  },

  renderMessageContent: function() {
    let c = this.props.comment;

    if (this.isCurrentUser() && this.state.isEditing) {
      return <CommentForm mode='edit' {...this.props} onCancel={this.toggleEdit} onSubmit={this.toggleEdit} />;
    } else if (c.deleted_at) {
      return translate('Comment has been deleted.');
    } else {
      return <div dangerouslySetInnerHTML={{__html: sanitize(c.description) }} />;
    }
  },

  renderModerationStatus: function() {
    var s = this.props.comment.moderation_status;

    if (s == null || s === 'approved') { return; }

    var m;
    if (s === 'pending') {
      m = translate('Your comment is awaiting moderation');
    } else {
      m = translate('Your comment has been marked as {status}', { status: s });
    }

    return (
      <p className='comment-moderation-status'>{m}</p>
    );
  },

  renderReplyForm: function() {
    if (!this.state.isReplying) { return; }

    const s = { marginTop: 10 };

    return <CommentForm {...this.props} style={s} mode='reply' onCancel={this.closeReply} onSubmit={this.closeReply} parentId={this.props.comment.id} />;
  },

  renderFooter() {
    if (this.props.comment.deleted_at == null) {
      return (
        <CommentFooter {...this.props}
          isCurrentUser={this.isCurrentUser()}
          onToggleEdit={this.toggleEdit}
          isEditing={this.state.isEditing}
          onToggleReply={this.toggleReply}
          isReplying={this.state.isReplying} />
      );
    }
  },

  render() {
    let comment = this.props.comment;
    var user = comment.user;
    var isCurrentUser = this.isCurrentUser();

    const s = { marginBottom: 20 }

    return (
      <div style={s} className={cx({ row:true, comment: true, collapsed: this.state.isCollapsed })}>
        <div className='small-12 columns ps-0'>
          <div className='row comment-header'>
            <div className='small-1 medium-1 pr-0 columns'>
              <Avatar {...this.props.comment.user}/>
            </div>
            <div className='small-11 columns'>
              <CommentMeta
                {...this.props}
                isCurrentUser={isCurrentUser}
                isCollapsed={this.state.isCollapsed}
                onToggleCollapse={this.toggleCollapse}/>
            </div>
          </div>
        </div>
        <div className='small-12 medium-11 medium-offset-1 columns comment-container ps-0'>
          {this.renderModerationStatus()}

          <div className='comment-message'>{this.renderMessageContent()}</div>

          {this.renderFooter()}
          {this.renderReplyForm()}
        </div>
      </div>
    );
  }
});

function renderComment(properties, depth) {
  const user = properties.user;
  const comment = properties.comment;
  const depth = properties.depth || 0;
  const settings = properties.settings;
  const providers = properties.providers;
  const actions = properties.actions;

  let replies = _.map(comment.children, function(c) {
    return renderComment({
      user,
      comment: c,
      depth: depth + 1,
      settings,
      providers,
      actions
    });
  });

  const s = { marginLeft: depth * 10 };

  return (
    <div key={comment.id} style={s}>
      <SingleComment user={user} comment={comment} depth={depth} settings={settings} providers={providers} actions={actions} />
      {replies}
    </div>
  );
}

var Comment = React.createClass({
  render: function() {
    return renderComment(this.props);
  }
});

module.exports = Comment;


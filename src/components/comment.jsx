import React from 'react';
import cx from 'react/lib/cx';
import moment from 'moment';
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
    e && e.preventDefault();
    this.setState({ isReplying: !this.state.isReplying });
  },

  closeReply: function(e) {
    e && e.preventDefault();
    this.setState({ isReplying: false });
  },

  renderMessageContent: function() {
    var comment = this.props.comment;

    if (this.isCurrentUser() && this.state.isEditing) {
      return <CommentForm mode='edit' {...this.props} onCancel={this.toggleEdit} onSubmit={this.toggleEdit} />;
    } else {
      return <div dangerouslySetInnerHTML={{__html: sanitize(comment.description) }} />;
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

    return <CommentForm mode='reply' {...this.props} onCancel={this.closeReply} onSubmit={this.closeReply} parentId={this.props.comment.id} />;
  },

  render() {
    let comment = this.props.comment;
    var user = comment.user;
    var isCurrentUser = this.isCurrentUser();
    var canEdit = comment.user.id === (this.props.user || {}).id;

    return (
      <div key={comment.id} className={cx({ row:true, comment: true, collapsed: this.state.isCollapsed })}>
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

          <CommentFooter
            {...this.props}
            isCurrentUser={isCurrentUser}
            onToggleEdit={this.toggleEdit}
            isEditing={this.state.isEditing}
            onToggleReply={this.toggleReply}
            isReplying={this.state.isReplying} />

          {this.renderReplyForm()}
        </div>
      </div>
    );
  }
});

function renderComment(properties, depth) {
  let user = properties.user;
  let comment = properties.comment;
  let depth = properties.depth || 0;
  let settings = properties.settings;
  let providers = properties.providers;

  let replies = _.map(comment.children, function(c) {
    let p = {
      user,
      comment: c,
      depth: depth + 1,
      settings,
      providers
    };

    return renderComment(p);
  });

  return (
    <div key={comment.id}>
      <SingleComment user={user} comment={comment} depth={depth} settings={settings} providers={providers} />
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


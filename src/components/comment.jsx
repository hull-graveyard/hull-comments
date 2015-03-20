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

var Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func,
    currentUser: React.PropTypes.object,
    onReply: React.PropTypes.func
  },

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

  render: function() {
    var comment = this.props.comment;
    var user = comment.user;
    var isCurrentUser = this.isCurrentUser();
    var canEdit = comment.user.id === (this.props.user || {}).id;
    return <div className={cx({ row:true, comment: true, collapsed: this.state.isCollapsed })}>
      <div className='small-12 columns'>
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
      <div className='small-12 medium-11 medium-offset-1 columns comment-container'>
        {this.renderModerationStatus()}

        <div className='comment-message'>{this.renderMessageContent()}</div>

        <CommentFooter
          {...this.props}
          isCurrentUser={isCurrentUser}
          onToggleEdit={this.toggleEdit}
          isEditing={this.state.isEditing}/>
      </div>
    </div>;
  }
});

module.exports = Comment;


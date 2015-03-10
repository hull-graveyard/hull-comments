import React from 'react';
import cx from 'react/lib/cx';
import moment from 'moment';

import CommentForm from './comment-form';
import DropdownMenu from './dropdown-menu';
import ShareMenu from './share-menu';

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

  handleDelete: function(e) {
    e.preventDefault();
    if (this.props.comment && this.props.comment.id) {
      this.props.actions.deleteComment(this.props.comment.id);
    }
  },

  toggleCollapse: function(e) {
    e.preventDefault();
    this.setState({ isCollapsed: !this.state.isCollapsed });
  },

  handleFlag: function(e) {
    e.preventDefault();
    this.props.actions.flag(this.props.comment.id);
  },

  getCommentActions: function() {
    var actions = [
      { value: 'Spam', label: 'Mark as Spam', onClick: this.handleFlag }
    ];

    if (this.isCurrentUser()) {
      actions.push({
        value: 'Delete',
        label: 'Delete',
        onClick: this.handleDelete
      });
    }

    return actions;
  },

  upVote: function(e) {
    e.preventDefault();
    if (this.props.user) {
      this.props.actions.upVote(this.props.comment.id);
    }

  },

  downVote: function(e) {
    e.preventDefault();
    if (this.props.user) {
      this.props.actions.downVote(this.props.comment.id);
    }
  },

  getScore: function() {
    var stats = this.props.comment && this.props.comment.stats || {};
    return stats.reviews && stats.reviews.sum;
  },

  isCurrentUser: function() {
    var commentUser = (this.props.comment || {}).user || {};
    var currentUser = (this.props.user || {});
    return commentUser.id === currentUser.id;
  },

  toggleEdit: function(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  },

  handleShare: function(provider, e) {
    e.preventDefault();
    this.props.actions.share(provider);
  },

  renderFooter: function() {
    var items = [], separator = <li className="bullet" aria-hidden="true">•</li>;
    items.push(
      <li className="voting" key="voting">
        <a href="#" className="vote-up  count-1" data-action="upvote" title="Vote up" onClick={this.upVote}>
          <span className="updatable count" data-role="likes">{this.getScore()}</span>
          <span className="control">
            <i aria-hidden="true" className="icon icon-arrow-2"></i>
          </span>
        </a>
        <span role="button" className="vote-down  count-0" href="#" data-action="downvote" title="Vote down"  onClick={this.downVote}>
          <span className="control">
            <i aria-hidden="true" className="icon icon-arrow"></i>
          </span>
        </span>
      </li>
    )

    items.push(separator);

    if (this.isCurrentUser()) {
      items.push(
        <li key="edit" className={cx({ edit: true, active: this.state.isEditing })}>
          <a href="#" onClick={this.toggleEdit}>
            <i className="icon icon-mobile icon-pencil" />
            <span className="text">Edit</span>
          </a>
        </li>
      );
      items.push(separator);
    }

    items.push((
      <li className="share">
        <a className="toggle">
          <i className="icon icon-mobile icon-share" />
          <span className="text">Share ›</span></a>
        <ul>
          <li className="twitter"><a href="#" onClick={this.handleShare.bind(this, 'twitter')}>Twitter</a></li>
          <li className="facebook"><a href="#"  onClick={this.handleShare.bind(this, 'facebook')}>Facebook</a></li>
        </ul>
      </li>
    ));


    return <footer>
      <menu>{items}</menu>
    </footer>;
  },

  renderMessageContent: function() {
    var comment = this.props.comment;
    if (this.state.isEditing) {
      return <CommentForm mode="edit" {...this.props} onCancel={this.toggleEdit} onSubmit={this.toggleEdit} />;
    } else {
      return <p>{ comment.description }</p>;
    }
  },

  render: function() {
    var comment = this.props.comment;
    var user = comment.user;
    var canEdit = comment.user.id === (this.props.user || {}).id;
    return <li className={cx({ post: true, collapsed: this.state.isCollapsed })}>
      <div data-role="post-content" className="post-content">
        <div className="indicator"></div>
        <div className="avatar hovercard">
          <a className="user"><img alt="Avatar" src={user.picture} /></a>
        </div>
        <div className="post-body">
          <header>
            <span className="post-byline">
              <span className="author publisher-anchor-color">
                <a>{user.name}</a> { user.is_admin ? <span className="badge moderator">Mod</span> : undefined }
              </span>
            </span>
            <div className="post-meta">
              <span className="bullet time-ago-bullet" aria-hidden="true">•</span>
              <a href={"#comment-" + comment.id} data-role="relative-time" className="time-ago">
                {moment(comment.created_at).fromNow()}
              </a>
            </div>

            <ul className="post-menu" data-role="menu">
              <li className={this.state.isCollapsed ? "expand" : "collapse"}>
                <a href="#" onClick={this.toggleCollapse} title="Collapse">
                  <span>{this.state.isCollapsed ? "+" : "−"}</span>
                </a>
              </li>
              <DropdownMenu component='li' options={this.getCommentActions()} />
            </ul>
          </header>
          <div className="post-body-inner">
            <div className="post-message-container" data-role="message-container">
              <div data-role="message-content">
                <div className="post-message publisher-anchor-color " data-role="message" dir="auto">
                  {this.renderMessageContent()}
                </div>
                <div className="post-media">
                  <ul data-role="post-media-list"></ul>
                </div>
              </div>
            </div>
          </div>
          {this.renderFooter()}
        </div>
      </div>
    </li>;
  }

});


module.exports = Comment;

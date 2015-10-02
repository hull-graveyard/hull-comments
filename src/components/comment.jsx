import React from 'react';
import cx from 'classnames';
import CommentMeta from './comment-meta';
import CommentModerationStatus from './comment-moderation-status';
import CommentMessage from './comment-message';
import CommentFooter from './comment-footer';
import TopForm from './top-form';
import Avatar from './avatar';
import _ from '../lib/lodash';
import styles from '../styles/comment.scss';
import cssModules from '../lib/cssModules';


const Comment = React.createClass({
  propTypes: {
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
    user: React.PropTypes.object,
    depth: React.PropTypes.number.isRequired,
    settings: React.PropTypes.object,
    actions: React.PropTypes.object,
    providers: React.PropTypes.array,
  },

  getDefaultProps() {
    return {
      comment: {},
      depth: 0,
    };
  },

  getInitialState() {
    return { isReplying: false, isEditing: false, isCollapsed: false };
  },


  isCurrentUser() {
    const commentUser = (this.props.comment || {}).user || {};
    const currentUser = (this.props.user || {});
    return commentUser.id === currentUser.id;
  },

  handleToggleCollapse(e) {
    e.preventDefault();
    this.setState({ isCollapsed: !this.state.isCollapsed });
  },
  handleToggleEdit(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  },
  handleToggleReply(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ isReplying: !this.state.isReplying });
  },
  handleCloseReply(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ isReplying: false });
  },

  renderReplyForm() {
    if (!this.state.isReplying) { return null; }
    return <TopForm {...this.props} mode="reply" onCancel={this.handleCloseReply} onSubmit={this.handleCloseReply} parentId={this.props.comment.id}/>;
  },

  renderReplies() {
    const { user, comment, settings, providers, actions } = this.props;
    const depth = this.props.depth || 0;

    return _.map(comment.children, function(c, i) {
      const props = {
        user,
        parent: comment,
        comment: c,
        depth: depth + 1,
        settings,
        providers,
        actions,
      };
      return <WrappedComment key={i} {...props}/>;
    });
  },

  render() {
    const comment = this.props.comment;
    const isCurrentUser = this.isCurrentUser();

    return (
      <div styleName={cx({comment: true, root: !this.props.depth, collapsed: this.state.isCollapsed })}>
        <div styleName="avatar">
          <Avatar {...comment.user}/>
        </div>
        <div styleName="container">
          <CommentMeta
            {...this.props}
            {...this.state}
            isCurrentUser={isCurrentUser}
            onToggleCollapse={this.handleToggleCollapse}
          />
          <CommentModerationStatus {...comment} {...this.state}/>
          <CommentMessage
            {...this.props}
            {...this.state}
            isCurrentUser={isCurrentUser}
            onToggleEdit={this.handleToggleEdit}
          />
          <CommentFooter
            {...this.props}
            {...this.state}
            isCurrentUser={isCurrentUser}
            onToggleEdit={this.handleToggleEdit}
            onToggleReply={this.handleToggleReply}
          />
        </div>
        {this.renderReplyForm()}
        {this.renderReplies(this.props)}
      </div>
    );
  },
});

const WrappedComment = cssModules(Comment, styles);
module.exports = WrappedComment;

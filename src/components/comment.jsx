import React                   from 'react';
import cx                      from 'classnames';
import ShareMenu               from './share-menu';
import CommentMeta             from './comment-meta';
import CommentModerationStatus from './comment-moderation-status';
import CommentMessage          from './comment-message';
import CommentFooter           from './comment-footer';
import TopForm                 from './top-form';
import Conversation            from './conversation';
import Avatar                  from './avatar';
import { translate }           from '../lib/i18n';
import _                       from '../lib/lodash';

var Comment = React.createClass({
  getDefaultProps() {
    return {
      comment: {},
      depth: 0
    };
  },

  getInitialState() {
    return { isReplying: false, isEditing: false, isCollapsed: false };
  },


  isCurrentUser() {
    var commentUser = (this.props.comment || {}).user || {};
    var currentUser = (this.props.user || {});
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
    if (!this.state.isReplying) { return; }
    return <TopForm {...this.props} mode='reply' onCancel={this.handleCloseReply} onSubmit={this.handleCloseReply} parentId={this.props.comment.id}/>
  },

  renderReplies(){
    let { user, comment, depth, settings, providers, actions } = this.props
    depth = depth || 0;

    return _.map(comment.children, function(c, i) {
      let props = {
        user,
        parent: comment,
        comment: c,
        depth: depth + 1,
        settings,
        providers,
        actions
      }
      return <Comment key={i} {...props}/>;
    });
  },

  render() {
    let comment = this.props.comment;
    var user = comment.user;
    var isCurrentUser = this.isCurrentUser();

    return (
      <div className={cx({ 'row comment': true, 'comment--root':!this.props.depth, collapsed: this.state.isCollapsed })}>
        <Avatar {...comment.user} className='comment__avatar'/>
        <div className="comment__container">
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
  }
});


// function renderComment(properties) {
//   return <SingleComment {...properties} />
// }

// var Comment = React.createClass({
//   render() {
//     return renderComment(this.props);
//   }
// });

module.exports = Comment;


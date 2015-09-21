import React from 'react';
import CommentForm from './comment-form';
import { translate } from '../lib/i18n';
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var CommentMessage = React.createClass({
  render() {
    let { comment, isCurrentUser, isEditing, onToggleEdit } = this.props;
    let content;

    if (isCurrentUser && isEditing) {
      content = <CommentForm mode='edit' {...this.props} onCancel={onToggleEdit} onSubmit={onToggleEdit} />;
    } else if (comment.deleted_at) {
      content = <small className='light-text'>{translate('Comment has been deleted.')}</small>;
    } else {
      content = <div dangerouslySetInnerHTML={{__html: comment.description }} />;
    }
    return <div className='comment__body'>{content}</div>
  }

});

module.exports = CommentMessage;

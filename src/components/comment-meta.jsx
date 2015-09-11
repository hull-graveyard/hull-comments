import React from 'react';
import cx from 'react/lib/cx';
import CommentActions from './comment-actions';
import { translate } from '../lib/i18n';
import relativeTime from '../lib/relative-time';

var CommentMeta = React.createClass({
  render: function() {
    var comment = this.props.comment;
    var user = comment.user || {};

    return (
      <header className='comment-meta light-text'>
        <strong className='comment-author'>
          <a>{user.name || translate('Guest')}</a> { user.is_admin ? <span className='admin'>{translate('Admin')}</span> : undefined }
        </strong>

        <span className='comment-time'>
          <a href={'#comment-' + comment.id}>{relativeTime(comment.created_at)}</a>
        </span>

        <CommentActions {...this.props}/>
      </header>
    );
  }
});

module.exports = CommentMeta;

import React from 'react';
import cx from 'classnames';
import CommentActions from './comment-actions';
import Icon from './icon';
import { translate } from '../lib/i18n';
import relativeTime from '../lib/relative-time';

var CommentMeta = React.createClass({
  renderReplyTo(){
    if(this.props.parent){
      return <span><Icon name='reply' colorize/>In reply to {this.props.parent.user.name} </span>
    }
  },
  render() {
    var comment = this.props.comment;
    var user = comment.user || {};

    return (
      <header className='comment-meta'>
        <strong className='comment-author'>
          <a>{user.name || translate('Guest')}</a>
          { user.is_admin ? <span className='comment__admin-label'> {translate('Moderator')} </span> : undefined }
        </strong>

        {this.renderReplyTo()}
        
        <span className='comment-time'> {relativeTime(comment.created_at)} </span>

        <CommentActions {...this.props}/>
      </header>
    );
  }
});

module.exports = CommentMeta;

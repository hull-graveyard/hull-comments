import React from 'react';
import Avatar from './avatar';
import CommentForm from './comment-form';
import EmailLogin from './email-login';

var TopForm = React.createClass({

  render: function() {
    return (
      <div className={`row comment-composer ${this.props.top ? 'comment-composer--top':''}`}>
        <Avatar {...this.props.user} className='comment-composer__avatar'/>
        <CommentForm {...this.props} />
        <EmailLogin {...this.props} className='auth-email left'/>
      </div>
    );
  }

});

module.exports = TopForm;

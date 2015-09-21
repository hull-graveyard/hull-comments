import React from 'react';
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
import { translate } from '../lib/i18n';

var CommentModerationStatus = React.createClass({
  render() {
    let {status:moderation_status, isCurrentUser} = this.props;
    let message;

    if (!isCurrentUser || status == null || status === 'approved') { return <noscript/>; }

    if (status === 'pending') {
      message = translate('Your comment is awaiting moderation');
    } else {
      message = translate('Your comment has been marked as {status}', { status: status });
    }

    return (<small className='light-text'>{message}</small>);
  }

});

module.exports = CommentModerationStatus;

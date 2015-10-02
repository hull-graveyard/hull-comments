import React from 'react';
import CommentActions from './comment-actions';
import Icon from './icon';
import { translate } from '../lib/i18n';
import relativeTime from '../lib/relative-time';
import styles from '../styles/comment-meta.scss';
import cssModules from '../lib/cssModules';

const CommentMeta = React.createClass({
  propTypes: {
    parent: React.PropTypes.object,
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
  },
  renderReplyTo() {
    const parent = this.props.parent;
    if (parent) {
      return <span styleName="nowrap"><Icon name="reply" colorize/>{translate('In reply to {name}', {name: parent.user.name})} </span>;
    }
  },
  render() {
    const comment = this.props.comment;
    const user = comment.user || {};

    return (
      <header styleName="meta">
        <strong>
          <a>{user.name || translate('Guest')}</a>
          { user.is_admin ? <span styleName="admin"> {` ${translate('Moderator')} `} </span> : null }
        </strong>
        <span className="light-text">
          {this.renderReplyTo()}
          <span styleName="nowrap">{` ${relativeTime(comment.created_at)} `}</span>
        </span>
        <div styleName="actions">
          <CommentActions {...this.props}/>
        </div>
      </header>
    );
  },
});

module.exports = cssModules(CommentMeta, styles);

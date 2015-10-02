import React from 'react';
import CommentActions from './comment-actions';
import Icon from './icon';
import { translate } from '../lib/i18n';
import relativeTime from '../lib/relative-time';
import styles from '../styles/comment-meta.scss';
import cssModules from 'react-css-modules';

@cssModules(styles, {allowMultiple: true})
export default class CommentMeta extends React.Component {

  static propTypes = {
    parent: React.PropTypes.object,
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
  }

  renderReplyTo() {
    const parent = this.props.parent;
    if (parent) {
      return <span styleName="nowrap"><Icon name="reply" colorize/>{translate('In reply to {name}', {name: parent.user.name})} </span>;
    }
  }
  render() {
    const comment = this.props.comment;
    const user = comment.user || {};

    return (
      <header styleName="meta">

        <div styleName="actions">
          <CommentActions {...this.props}/>
        </div>

        <strong>
          <a>{user.name || translate('Guest')}</a>
          { user.is_admin ? <span styleName="admin"> {` ${translate('Moderator')} `} </span> : null }
        </strong>

        <div className="light-text">
          {this.renderReplyTo()}
          <span styleName="nowrap">{` ${relativeTime(comment.created_at)} `}</span>
        </div>


      </header>
    );
  }
}


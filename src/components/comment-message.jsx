import React from 'react';
import CommentForm from './comment-form';
import { translate } from '../lib/i18n';
import styles from '../styles/comment-message.scss';
import cssModules from 'react-css-modules';
import _ from 'lodash';

@cssModules(styles, {allowMultiple: true})
export default class CommentMessage extends React.Component {

  static propTypes = {
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
    isCurrentUser: React.PropTypes.bool,
    isEditing: React.PropTypes.bool,
    onToggleEdit: React.PropTypes.func.isRequired,
  }


  render() {
    const { comment, isCurrentUser, isEditing, onToggleEdit } = this.props;
    const props = _.omit(this.props, 'styles');

    let content;

    if (isCurrentUser && isEditing) {
      content = <CommentForm mode="edit" {...props} onCancel={onToggleEdit} onSubmit={onToggleEdit} />;
    } else if (comment.deleted_at) {
      content = <small className="light-text">{translate('Comment has been deleted.')}</small>;
    } else {
      content = <div dangerouslySetInnerHTML={{__html: comment.description }} />;
    }
    return <div styleName="body">{content}</div>;
  }

}

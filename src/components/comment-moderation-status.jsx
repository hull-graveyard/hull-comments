import React from 'react';
import { translate } from '../lib/i18n';
import styles from '../styles/main.css';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class CommentModerationStatus extends React.Component {

  static propTypes = {
    status: React.PropTypes.oneOfType([
      React.PropTypes.oneOf([null]),
      React.PropTypes.string,
    ]),
    isCurrentUser: React.PropTypes.bool,
  };

  render() {
    const { status, isCurrentUser } = this.props;

    let message;

    if (!isCurrentUser || status === null || status === 'approved') { return null; }

    if (status === 'pending') {
      message = translate('Your comment is awaiting moderation');
    } else {
      message = translate('Your comment has been marked as {status}', { status: status });
    }

    return <small className="light-text">{message}</small>;
  }

}


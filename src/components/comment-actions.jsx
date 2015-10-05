import React from 'react';
import Icon from './icon';
import DropdownMenu from './dropdown-menu';
import { translate } from '../lib/i18n';
import styles from '../styles/comment-actions.css';
import cssModules from 'react-css-modules';

@cssModules(styles, {allowMultiple: true})
export default class CommentActions extends React.Component {

  static propTypes = {
    isCurrentUser: React.PropTypes.bool,
    user: React.PropTypes.object,
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
    actions: React.PropTypes.object,
  }

  handleFlag = (event) => {
    event.preventDefault();
    this.props.actions.flag(this.props.comment.id);
  }

  handleDelete = (event) => {
    event.preventDefault();
    if (this.props.comment && this.props.comment.id) {
      this.props.actions.deleteComment(this.props.comment.id);
    }
  }

  render() {
    const actions = [];

    if (this.props.user) {
      actions.push({
        value: 'Spam',
        label: <span><Icon name="ghost"/>{translate('Mark as spam')}</span>,
        onClick: this.handleFlag,
      });
    }

    if (this.props.isCurrentUser) {
      actions.push({
        value: 'Delete',
        label: <span><Icon name="trash"/>{translate('Delete')}</span>,
        onClick: this.handleDelete,
      });
    }

    if (actions.length === 0) { return null; }

    return (
      <ul styleName="actions" className="light-text">
        <DropdownMenu right component="li" options={actions} title={<Icon name="cog" size={16} style={{verticalAlign: '-8%'}}/>} />
      </ul>
    );
  }
}

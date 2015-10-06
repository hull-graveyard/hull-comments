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
    onToggleEdit: React.PropTypes.func,
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

  handleEdit = (event) => {
    event.preventDefault();
    if (this.props.comment && this.props.comment.id) {
      this.props.onToggleEdit();
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
      actions.push({
        value: 'Edit',
        label: <span><Icon name="pencil"/>{translate('Edit')}</span>,
        onClick: this.handleEdit,
      });
    }

    if (actions.length === 0) { return null; }

    return (
      <ul styleName="actions">
        <DropdownMenu right component="li" options={actions} title={<Icon name="cog" style={{verticalAlign: '-8%'}}/>} />
      </ul>
    );
  }
}

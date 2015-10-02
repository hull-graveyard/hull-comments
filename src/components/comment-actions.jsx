import React from 'react';
import Icon from './icon';
import DropdownMenu from './dropdown-menu';
import { translate } from '../lib/i18n';
import styles from '../styles/comment-actions.scss';
import cssModules from '../lib/cssModules';

const CommentActions = React.createClass({
  propTypes: {
    isCurrentUser: React.PropTypes.bool,
    user: React.PropTypes.object,
    comment: React.PropTypes.shape({
      user: React.PropTypes.object,
      id: React.PropTypes.string,
    }).isRequired,
    actions: React.PropTypes.object,
  },

  handleFlag(e) {
    e.preventDefault();
    this.props.actions.flag(this.props.comment.id);
  },

  handleDelete(e) {
    e.preventDefault();
    if (this.props.comment && this.props.comment.id) {
      this.props.actions.deleteComment(this.props.comment.id);
    }
  },

  renderActions() {
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
    return <DropdownMenu component="li" options={actions} title={<Icon name="cog" size={16} style={{verticalAlign: '-8%'}}/>} />;
  },

  render() {
    return (
      <ul styleName="actions" className="light-text">
        {this.renderActions()}
      </ul>
    );
  },
});

module.exports = cssModules(CommentActions, styles);

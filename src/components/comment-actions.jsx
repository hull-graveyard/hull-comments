import React from 'react';
import cx from 'react/lib/cx';
import DropdownMenu from './dropdown-menu';
import { translate } from '../lib/i18n';

var CommentActions = React.createClass({
  handleFlag: function(e) {
    e.preventDefault();
    this.props.actions.flag(this.props.comment.id);
  },

  handleDelete: function(e) {
    e.preventDefault();
    if (this.props.comment && this.props.comment.id) {
      this.props.actions.deleteComment(this.props.comment.id);
    }
  },

  renderActions: function() {
    var actions = [];

    if (this.props.user) {
      actions.push({ value: 'Spam', label: translate('Mark as spam'), onClick: this.handleFlag });
    }

    if (this.props.isCurrentUser) {
      actions.push({
        value: 'Delete',
        label: translate('Delete'),
        onClick: this.handleDelete
      });
    }

    if (actions.length == 0) { return; }

    return <DropdownMenu component='li' options={actions} title={translate('actions')} />;
  },

  render: function() {
    var t = translate(this.props.isCollapsed ? 'Expand' : 'Collapse');

    return (
      <ul className="comment-actions menubar-list">
        <li className={this.props.isCollapsed ? "expand" : "collapse"}>
          <a href="#" onClick={this.props.onToggleCollapse} title={t}><strong>{this.props.isCollapsed ? "+" : "−"}</strong></a>
        </li>
        {this.renderActions()}
      </ul>
    );
  }
});

module.exports = CommentActions;

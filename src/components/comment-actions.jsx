import React from 'react';
import cx from 'react/lib/cx';
import DropdownMenu from './dropdown-menu';

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

  getCommentActions: function() {
    var actions = [
      { value: 'Spam', label: 'Mark as Spam', onClick: this.handleFlag }
    ];

    if (this.props.isCurrentUser) {
      actions.push({
        value: 'Delete',
        label: 'Delete',
        onClick: this.handleDelete
      });
    }

    return actions;
  },

  render: function() {

    return (
      <ul className="comment-actions">
        <li className={this.props.isCollapsed ? "expand" : "collapse"}>
          <a href="#" onClick={this.props.onToggleCollapse} title="Collapse"><strong>{this.props.isCollapsed ? "+" : "−"}</strong></a>
        </li>
        <DropdownMenu component='li' options={this.getCommentActions()} />
      </ul>
    );
  }

});

module.exports = CommentActions;

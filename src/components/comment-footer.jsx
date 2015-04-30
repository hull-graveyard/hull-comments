import React from 'react';
import cx from 'react/lib/cx';
import ShareMenu from './share-menu';
import Icon from './icon';
import { translate } from '../lib/i18n';

var CommentFooter = React.createClass({
  upVote: function(e) {
    e.preventDefault();
    if (this.props.user) {
      this.props.actions.upVote(this.props.comment.id);
    }
  },

  downVote: function(e) {
    e.preventDefault();
    if (this.props.user) {
      this.props.actions.downVote(this.props.comment.id);
    }
  },

  handleShare: function(provider, e) {
    e.preventDefault();
    this.props.actions.share(provider);
  },

  getPositiveScore: function() {
    if (this.props.comment.votes == null) { return; }

    var s = this.props.comment.votes.up;
    if (s > 0){ return s; }
  },

  getNegativeScore: function() {
    if (this.props.comment.votes == null) { return; }

    var s = this.props.comment.votes.down;
    if (s > 0){ return s; }
  },

  render: function() {
    if (this.props.comment == null || this.props.comment.id == null) {
      return <div className='comment-footer light-text'>{translate('Posting comment...')}</div>;
    }

    var items = [];

    if (this.props.isCurrentUser) {
      items.push(
        <li key='edit' className={cx({ edit: true, active: this.props.isEditing })}>
          <a href="#" onClick={this.props.onToggleEdit}>
            <i className="icon icon-mobile icon-pencil" /> {translate('Edit')}
          </a>
        </li>
      );
    }

    items.push(
      <li key='reply'>
        <a href='javascript: void 0;' onClick={this.props.onToggleReply}>{translate('Reply')}</a>
      </li>
    );

    items.push(<ShareMenu key='share' {...this.props} />);

    return <div className='comment-footer light-text'><div className='menubar-list'>{items}</div></div>;
  }
});

module.exports = CommentFooter;


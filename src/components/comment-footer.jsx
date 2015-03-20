import React from 'react';
import cx from 'react/lib/cx';
import ShareMenu from './share-menu';
import Icons from './icons';

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
      return <div className='comment-footer light-text'>Posting comment...</div>;
    }

    var items = [], separator = <li className="bullet">•</li>;

    var ps = this.getPositiveScore();
    var ns = this.getNegativeScore();
    var downColor = (!!ns) ? "#FF6600" : null;
    var upColor = (!!ps) ? "#FFCC00" : null;
    var up;
    var down;
    if (this.props.user == null) {
      up = <span className={cx({'text-warning':!!ps})}>{ps} <Icons.ArrowUp size={13} settings={this.props.settings} color={upColor}/></span>
      down = <span className={cx({'text-alert':!!ns})}><Icons.ArrowDown size={13} settings={this.props.settings} color={downColor}/> {ns}</span>
    } else {
      up = <a href="#" title="Vote up" className={cx({'text-warning':!!ps})} onClick={this.upVote}>{ps} <Icons.ArrowUp size={13} settings={this.props.settings} color={upColor}/></a>
      down = <a href="#" title="Vote down" className={cx({'text-alert':!!ns})} onClick={this.downVote}><Icons.ArrowDown size={13} settings={this.props.settings} color={downColor}/> {ns}</a>
    }
    items.push(<li key='vote-down' className="voting">{up}</li>);
    items.push(<li key='vote-up' className="voting">{down}</li>);

    if (this.props.isCurrentUser) {
      items.push(
        <li key='edit' className={cx({ edit: true, active: this.props.isEditing })}>
          <a href="#" onClick={this.props.onToggleEdit}>
            <i className="icon icon-mobile icon-pencil" /> Edit
          </a>
        </li>
      );
    }

    items.push(<ShareMenu key='share' {...this.props} />);

    return <div className='comment-footer light-text'><div className='menubar-list'>{items}</div></div>;
  }
});

module.exports = CommentFooter;


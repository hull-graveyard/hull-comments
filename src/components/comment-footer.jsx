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

  getScore: function() {
    var stats = this.props.comment && this.props.comment.stats || {};
    return stats.reviews && stats.reviews.sum;
  },
  getPositiveScore: function() {
    var s  =this.getScore();
    return s>0 && s;
  },
  getNegativeScore: function() {
    var s  =this.getScore();
    if(s<0){
      return -s;
    }
    return null;
  },

  render: function() {
    var items = [], separator = <li className="bullet">•</li>;
    var ps = this.getPositiveScore();
    var ns = this.getNegativeScore();
    var downColor = (!!ns)?"#FF6600":null
    var upColor = (!!ps)?"#FFCC00":null
    items.push(
      <li className="voting">
        <a href="#" title="Vote up" className={cx({'text-warning':!!ps})} onClick={this.upVote}>{ps} <Icons.ArrowUp size={13} {...this.props.settings} color={upColor}/></a>
      </li>
    );

    items.push(
      <li className="voting">
        <a href="#" title="Vote down" className={cx({'text-alert':!!ns})} onClick={this.downVote}><Icons.ArrowDown size={13} {...this.props.settings} color={downColor}/> {ns}</a>
      </li>
    );

    if (this.props.isCurrentUser) {
      items.push(
        <li className={cx({ edit: true, active: this.props.isEditing })}>
          <a href="#" onClick={this.props.onToggleEdit}>
            <i className="icon icon-mobile icon-pencil" /> Edit
          </a>
        </li>
      );
    }

    items.push(<ShareMenu {...this.props} />);


    return <div className='comment-footer light-text'><div className='menubar-list'>{items}</div></div>;
  }

});

module.exports = CommentFooter;

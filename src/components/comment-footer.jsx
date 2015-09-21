import React from 'react';
import cx from 'classnames';
import ShareMenu from './share-menu';
import Icon from './icon';
import { translate } from '../lib/i18n';

var CommentFooter = React.createClass({
  upVote(e) {
    e.preventDefault();
    if (this.props.user) {
      this.props.actions.upVote(this.props.comment.id);
    }
  },

  downVote(e) {
    e.preventDefault();
    if (this.props.user) {
      this.props.actions.downVote(this.props.comment.id);
    }
  },

  handleShare(provider, e) {
    e.preventDefault();
    this.props.actions.share(provider);
  },

  getPositiveScore() {
    if (this.props.comment.votes == null) { return; }

    var s = this.props.comment.votes.up;
    if (s > 0){ return s; }
  },

  getNegativeScore() {
    if (this.props.comment.votes == null) { return; }

    var s = this.props.comment.votes.down;
    if (s > 0){ return s; }
  },

  renderVote(){
    let ps = this.getPositiveScore(),
        ns = this.getNegativeScore(),
        downColor = (!!ns) ? "#FF6600" : null,
        upColor = (!!ps) ? "#FFCC00" : null,
        iconUp = <Icon name='chevron_up' colorize />,
        iconDown =  <Icon name='chevron_down' colorize />;

    let style = {}
    if (this.props.user == null) {
      style.cursor='default'
    }
    return <li key='vote' className='comment-footer__list-item'>
      <a href="#" style={style} title={translate("Vote up")} className={cx({'text-success':!!ps})} onClick={this.upVote}>{ps} {iconUp}</a>{this.renderSeparator()}<a href="#" style={style} title={translate("Vote down")} className={cx({'text-alert':!!ns})} onClick={this.downVote}>{iconDown} {ns}</a>{this.renderSeparator()}
    </li>;
  },
  renderSeparator(){
    return <span className="comment-footer__separator"/>
  },

  renderReply(){
    // if (!this.props.user) {return;}
    return (
      <li key='reply' className='comment-footer__list-item'>
        <a href='javascript: void 0;' onClick={this.props.onToggleReply}><Icon name='reply' colorize/>{translate('Reply')}</a>{this.renderSeparator()}
      </li>
    );
  },
  renderEdit(){
    if (!this.props.isCurrentUser) { return; }
    return <li key='edit' className='comment-footer__list-item'>
      <a href='javascript: void 0;' onClick={this.props.onToggleEdit}><Icon name='pencil' colorize/>{translate('Edit')}</a>{this.renderSeparator()}
    </li>
  },
  renderShare(){
    return <li key='share' className='comment-footer__list-item comment-footer__share-menu'><ShareMenu {...this.props} right size={24}/></li>;
  },

  render() {
    if (!!this.props.comment.deleted_at){
      return <noscript/>;
    }
    if (this.props.comment == null || this.props.comment.id == null) {
      return <div className='comment-footer light-text'>{translate('Posting comment...')}</div>;
    }

    return (
      <ul className='comment-footer__list'>
        {this.renderVote()}
        {this.renderReply()}
        {this.renderEdit()}
        {this.renderShare()}
      </ul>
    );
  }
});

module.exports = CommentFooter;


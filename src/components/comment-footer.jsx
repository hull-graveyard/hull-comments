import React from 'react';
import cx from 'classnames';
import ShareMenu from './share-menu';
import Icon from './icon';
import { translate } from '../lib/i18n';
import styles from '../styles/comment-footer.scss';
import cssModules from '../lib/cssModules';


const CommentFooter = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    actions: React.PropTypes.object,
    onToggleReply: React.PropTypes.func.isRequired,
    onToggleEdit: React.PropTypes.func.isRequired,
    isCurrentUser: React.PropTypes.bool,
    comment: React.PropTypes.shape({
      deleted_at: React.PropTypes.any,
      user: React.PropTypes.object,
      id: React.PropTypes.string,
      votes: React.PropTypes.oneOfType([
        React.PropTypes.oneOf([null]),
        React.PropTypes.object,
      ]),
    }).isRequired,
  },

  getNegativeScore() {
    if (!this.props.comment.votes) { return null; }
    const { votes } = this.props.comment;
    const s = votes.down;
    if (s > 0) { return s; }
    return null;
  },


  getPositiveScore() {
    if (!this.props.comment.votes) { return null; }
    const { votes } = this.props.comment;
    const s = votes.up;
    if (s > 0) { return s; }
    return null;
  },

  upVote(event) {
    event.preventDefault();
    if (this.props.user) {
      this.props.actions.upVote(this.props.comment.id);
    }
  },

  downVote(event) {
    event.preventDefault();
    if (this.props.user) {
      this.props.actions.downVote(this.props.comment.id);
    }
  },

  handleShare(provider, e) {
    e.preventDefault();
    this.props.actions.share(provider);
  },


  renderVote() {
    const ps = this.getPositiveScore();
    const ns = this.getNegativeScore();
    const iconUp = <Icon name="chevron_up" colorize />;
    const iconDown = <Icon name="chevron_down" colorize />;

    return (
      <li key="vote" styleName="item">
        <a title={translate('Vote up')}
          styleName={cx({ disabled: !!this.props.user, link: true, success: !!ps})}
          onClick={this.upVote}>{ps} {iconUp}</a>
        {this.renderSeparator()}
        <a title={translate('Vote down')}
          styleName={cx({ disabled: !!this.props.user, link: true, alert: !!ns})}
          onClick={this.downVote}>{iconDown} {ns}</a>
        {this.renderSeparator()}
      </li>
    );
  },
  renderSeparator() {
    return <span styleName="separator"/>;
  },

  renderReply() {
    return (
      <li key="reply" styleName="item">
        <a styleName="link"
           onClick={this.props.onToggleReply}><Icon name="reply" colorize/>{translate('Reply')}</a>{this.renderSeparator()}
      </li>
    );
  },
  renderEdit() {
    if (!this.props.isCurrentUser) { return null; }
    return (
       <li key="edit" styleName="item">
        <a styleName="link"
           onClick={this.props.onToggleEdit}><Icon name="pencil" colorize/>{translate('Edit')}</a>{this.renderSeparator()}
      </li>
    );
  },
  renderShare() {
    return <li key="share" styleName="item"><ShareMenu {...this.props} right size={24}/></li>;
  },

  render() {
    if (!!this.props.comment.deleted_at) {
      return <noscript/>;
    }
    if (this.props.comment === null || this.props.comment.id === null) {
      return <div styleName="footer">{translate('Posting comment...')}</div>;
    }

    return (
      <ul styleName="list">
        {this.renderVote()}
        {this.renderReply()}
        {this.renderEdit()}
        {this.renderShare()}
      </ul>
    );
  },
});

module.exports = cssModules(CommentFooter, styles);


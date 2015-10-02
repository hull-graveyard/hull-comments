import React from 'react';
import Comment from './comment';
import TopForm from './top-form';
import { translate } from '../lib/i18n';
import styles from '../styles/conversation.scss';
import cssModules from '../lib/cssModules';


const Conversation = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    hasMore: React.PropTypes.bool,
    comments: React.PropTypes.array.isRequired,
  },

  loadMore(e) {
    if (e && e.preventDefault) e.preventDefault();

    this.props.actions.fetchMore();
  },

  renderFetchMore() {
    if (!this.props.hasMore) { return null; }

    return (
      <a onClick={this.loadMore} styleName="button">{translate('Load more comments')}</a>
    );
  },

  render() {
    const comments = this.props.comments.map(function(comment, i) {
      return <Comment key={`comment-${comment.id || i}`} {...this.props} comment={comment} />;
    }, this);

    return (
      <div styleName="conversation">
        <TopForm {...this.props} top/>
        {comments}
        {this.renderFetchMore()}
      </div>
    );
  },
});

module.exports = cssModules(Conversation, styles);


import React from 'react';
import cx from 'classnames';
import Comment from './comment';
import TopForm from './top-form';
import { translate } from '../lib/i18n';

var Conversation = React.createClass({
  loadMore(e) {
    if (e && e.preventDefault) e.preventDefault();

    this.props.actions.fetchMore();
  },

  renderFetchMore() {
    if (!this.props.hasMore) { return; }

    return (
      <div className="load-more">
        <a onClick={this.loadMore} className="tiny button round transparent">{translate('Load more comments')}</a>
      </div>
    );
  },

  render() {
    var comments = this.props.comments.map(function(comment, i) {
      return  <Comment key={`comment-${comment.id || i}`} {...this.props} comment={comment} />;
    }, this);

    return (
      <div style={{paddingLeft: 5, paddingRight:5}}>
        <TopForm {...this.props} top={true}/>

        {comments}

        {this.renderFetchMore()}
      </div>
    );
  }
});

module.exports = Conversation;


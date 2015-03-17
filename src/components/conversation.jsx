import React from 'react';
import cx from 'react/lib/cx';

import Comment from './comment';
import TopForm from './top-form';

var Posts = React.createClass({

  loadMore: function(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.props.actions.fetchMore();
  },

  render: function() {
    var comments = this.props.comments.map(function(comment, i) {
        return  <Comment key={"comment-" + (comment.id || i)} {...this.props} comment={comment} />;
      }, this)
    return <div>
      <TopForm {...this.props}/>

      {comments}

      <div className="load-more row">
        <div className="small-12 columns">
          <a onClick={this.loadMore} className="tiny button round transparent">Load more comments</a>
        </div>
      </div>
    </div>
  }

});

var Conversation = React.createClass({

  render: function() {
    return <Posts {...this.props}/>
  }
});

module.exports = Conversation;

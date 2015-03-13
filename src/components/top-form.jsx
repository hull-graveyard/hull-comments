import React from 'react';
import Avatar from './avatar';
import CommentForm from './comment-form';

var TopForm = React.createClass({

  render: function() {
    return (
      <div className="row top-form">
        <div className="small-2 medium-1 pr-0 columns show-for-medium-up">
          <Avatar {...this.props.user}/>
        </div>
        <div className="small-12 medium-11 columns">
          <CommentForm {...this.props} />
        </div>
      </div>
    );
  }

});

module.exports = TopForm;

import React from 'react';
import Avatar from './avatar';
import CommentForm from './comment-form';

var TopForm = React.createClass({

  render: function() {
    return (
      <div className="">
        <div className="show-for-medium-up">
          <Avatar {...this.props.user}/>
        </div>
        <div className="">
          <CommentForm {...this.props} />
        </div>
      </div>
    );
  }

});

module.exports = TopForm;

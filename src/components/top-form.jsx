import React from 'react';
import Avatar from './avatar';
import CommentForm from './comment-form';

var TopForm = React.createClass({

  render: function() {
    return (
      <div className="row">
        <div className="medium-1 columns show-for-medium-up pl-0">
          <Avatar {...this.props.user}/>
        </div>
        <div className="medium-11 columns ps-0">
          <CommentForm {...this.props} />
        </div>
      </div>
    );
  }

});

module.exports = TopForm;

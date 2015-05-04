var React = require('react');

var CommentAvatar = React.createClass({
  render: function() {
    var comment = this.props.comment;
    var user = comment.user;
    return (
      <div className="avatar hovercard">
        <a className="user"><img alt="Avatar" src={user.picture} /></a>
      </div>
    );
  }
});

module.exports = CommentAvatar;

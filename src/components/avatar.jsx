var React = require('react');

var Avatar = React.createClass({
  getDefaultProps: function(){
    return {}
  },
  render: function() {
    var picture = this.props.picture || "http://hull.s3.amazonaws.com/avatar.png"
    return (
      <div className="avatar medium-text-center">
        <a className="user"><img src={picture} /></a>
      </div>
    );
  }

});

module.exports = Avatar;

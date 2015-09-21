var React = require('react');

var Avatar = React.createClass({
  getDefaultProps(){
    return {
      className:''
    }
  },
  render() {
    var picture = this.props.picture || "http://hull.s3.amazonaws.com/avatar.png"
    // var picture = Hull.config().orgUrl + '/api/v1/' + this.props.id + '/picture';
    return <div className={`avatar ${this.props.className}`}><img src={picture} /></div>;
  }

});

module.exports = Avatar;

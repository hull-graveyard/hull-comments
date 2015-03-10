import React from 'react';

var ContentEditable = React.createClass({
  getDefaultProps: function() {
    return {
      html: ''
    };
  },
  render: function(){
    return <div id="contenteditable"
    {...this.props}
    onInput={this.handleChange} 
    onBlur={this.handleChange}
    contentEditable
    dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },

  componentDidUpdate: function() {
    if ( this.props.html !== this.getDOMNode().innerHTML ) {
     this.getDOMNode().innerHTML = this.props.html;
   }
 },

 handleChange: function(evt){
  var html = this.getDOMNode().innerHTML;
  if (this.props.onChange && html !== this.lastHtml) {
    evt.target = { value: html };
    this.props.onChange(evt);
  }
  this.lastHtml = html;
}
});

module.exports = ContentEditable;

import React from 'react';

var ContentEditable = React.createClass({
  render: function(){
    var msg = this.props.html||this.props.placeholder
    return <div id="contenteditable"
    {...this.props}
    onInput={this.handleChange}
    onBlur={this.handleChange}
    contentEditable
    dangerouslySetInnerHTML={{__html: msg}}></div>;
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },

  componentDidUpdate: function() {
    if ( this.props.html !== this.getDOMNode().innerHTML ) {
     this.getDOMNode().innerHTML = this.props.html;
    }
  },

  handleBlur(evt){
    this.props.onBlur();
    this.handleChange(evt);
  },

  handleChange: function(evt){
    var html = this.getDOMNode().innerHTML;
    if(this.props.placeholder!==html){
      if (this.props.onChange && html !== this.lastHtml) {
        evt.target = { value: html };
        this.props.onChange(evt);
      }
      this.lastHtml = html;
    }
  }
});

module.exports = ContentEditable;

import React from 'react';

var ContentEditable = React.createClass({

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== React.findDOMNode(this).innerHTML;
  },

  componentDidUpdate() {
    if ( this.props.html !== React.findDOMNode(this).innerHTML ) {
     React.findDOMNode(this).innerHTML = this.props.html;
    }
  },

  handleBlur(evt){
    this.props.onBlur();
    this.emitChange(evt);
  },

  emitChange(evt) {
    var html = React.findDOMNode(this).innerHTML;

    var emit = (html == this.props.placeholder) ? '' : html

    if (this.props.onChange && emit !== this.lastHtml) {
      evt.target = { value: emit };
      this.props.onChange(evt);
    }

    this.lastHtml = emit;
  },

  render(){
    return <div ref='contentEditor'
    {...this.props}
    onInput={this.emitChange}
    onBlur={this.handleBlur}
    contentEditable
    dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
  }

});

module.exports = ContentEditable;

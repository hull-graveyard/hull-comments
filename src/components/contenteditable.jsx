import React from 'react';
import styles from '../styles/contenteditable.scss';
import cssModules from '../lib/cssModules';


const ContentEditable = React.createClass({
  propTypes: {
    html: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onBlur: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== React.findDOMNode(this).innerHTML;
  },

  componentDidUpdate() {
    if ( this.props.html !== React.findDOMNode(this).innerHTML ) {
      React.findDOMNode(this).innerHTML = this.props.html;
    }
  },

  handleBlur(evt) {
    this.props.onBlur();
    this.emitChange(evt);
  },

  emitChange(evt) {
    const html = React.findDOMNode(this).innerHTML;

    const emit = (html === this.props.placeholder) ? '' : html;

    if (this.props.onChange && emit !== this.lastHtml) {
      evt.target = { value: emit };
      this.props.onChange(evt);
    }

    this.lastHtml = emit;
  },

  render() {
    return (
      <div ref="contentEditor"
      styleName="textarea"
      {...this.props}
      onInput={this.emitChange}
      onBlur={this.handleBlur}
      contentEditable
      dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    );
  },

});

module.exports = cssModules(ContentEditable, styles);

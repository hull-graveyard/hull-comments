import React from 'react';
import ReactDOM from 'react-dom';

const isPlaceholderSupported = (typeof document !== 'undefined') && 'placeholder' in document.createElement('input');

/**
  * Input is a wrapper around React.DOM.input with a `placeholder` shim for IE9.
  * NOTE: only supports "controlled" inputs (http://facebook.github.io/react/docs/forms.html#controlled-components)
*/
const createShimmedElement = function(elementConstructor, name) {
  return React.createClass({
    displayName: name,

    propTypes: {
      placeholder: React.PropTypes.string.isRequired,
      valueLink: React.PropTypes.any,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      onSelect: React.PropTypes.func,
      onFocus: React.PropTypes.func,
      onBlur: React.PropTypes.func,
      children: React.PropTypes.any,
    },

    componentWillMount() {
      this.needsPlaceholding = this.props.placeholder && !isPlaceholderSupported;
    },

    componentWillReceiveProps(props) {
      this.needsPlaceholding = props.placeholder && !isPlaceholderSupported;
    },

    componentDidUpdate() {
      this.setSelectionIfNeeded(ReactDOM.findDOMNode(this));
    },

    // keep track of focus
    onFocus(e) {
      this.hasFocus = true;
      this.setSelectionIfNeeded(e.target);

      if (this.props.onFocus) { return this.props.onFocus(e); }
    },

    onChange(e) {
      const onChange = this.getOnChange();
      let value;
      let index;

      if (this.isPlaceholding) {
        // remove placeholder when text is added
        value = e.target.value;
        index = value.indexOf(this.props.placeholder);

        if (index !== -1) {
          e.target.value = value.slice(0, index);
        }
      }

      if (onChange) {
        return onChange(e);
      }
    },

    onSelect(e) {
      if (this.isPlaceholding) {
        this.setSelectionIfNeeded(e.target);

        return false;
      } else if (this.props.onSelect) {
        return this.props.onSelect(e);
      }
    },

    onBlur(e) {
      this.hasFocus = false;
      if (this.props.onBlur) { return this.props.onBlur(e); }
    },

    // this component supports valueLink or value/onChange.
    // borrowed from LinkedValueMixin.js
    getValue() {
      if (this.props.valueLink) {
        return this.props.valueLink.value;
      }

      return this.props.value;
    },

    getOnChange() {
      if (this.props.valueLink) {
        return this._handleLinkedValueChange;
      }

      return this.props.onChange;
    },

    setSelectionIfNeeded(node) {
      if (this.needsPlaceholding
        && 'setSelectionRange' in node
        && this.hasFocus
        && this.isPlaceholding
        && (node.selectionStart !== 0 || node.selectionEnd !== 0)) {
        node.setSelectionRange(0, 0);
      } // if placeholder is visible, ensure cursor is at start of input
    },

    _handleLinkedValueChange(e) {
      this.props.valueLink.requestChange(e.target.value);
    },

    render() {
      const props = {};
      let value;
      let key;

      for (key in this.props) {
        if (this.props.hasOwnProperty(key)) {
          props[key] = this.props[key];
        }
      }

      if (this.needsPlaceholding) {
        // override valueLink and event handlers
        props.onFocus = this.onFocus;
        props.onBlur = this.onBlur;
        props.onChange = this.onChange;
        props.onSelect = this.onSelect;
        // props.valueLink = undefined;

        value = this.getValue();

        if (!value) {
          this.isPlaceholding = true;
          value = this.props.placeholder;
          props.className += ' placeholder';
        } else {
          this.isPlaceholding = false;
        }

        props.value = value;
      }

      return React.createElement(elementConstructor, props, this.props.children);
    },
  });
};

module.exports = {
  Input: createShimmedElement('input', 'Input'),
  Textarea: createShimmedElement('textarea', 'Textarea'),
};

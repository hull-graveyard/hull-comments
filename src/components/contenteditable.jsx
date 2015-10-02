import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/contenteditable.scss';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class ContentEditable extends React.Component {

  static propTypes = {
    html: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onBlur: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    if ( this.props.html !== ReactDOM.findDOMNode(this).innerHTML ) {
      React.findDOMNodeDOM(this).innerHTML = this.props.html;
    }
  }

  handleBlur = (evt) => {
    this.props.onBlur();
    this.handleInput(evt);
  }

  handleInput = (evt) => {
    const html = ReactDOM.findDOMNode(this).innerHTML;

    const emit = (html === this.props.placeholder) ? '' : html;

    if (this.props.onChange && emit !== this.lastHtml) {
      evt.target = { value: emit };
      this.props.onChange(evt);
    }

    this.lastHtml = emit;
  }

  render() {
    return (
      <div ref="contentEditor"
      styleName="textarea"
      {...this.props}
      onInput={this.handleInput}
      onBlur={this.handleBlur}
      contentEditable
      dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    );
  }

}

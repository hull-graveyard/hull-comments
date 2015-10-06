import React from 'react';
import styles from '../styles/contenteditable.css';
import cssModules from 'react-css-modules';
import _ from 'lodash';


@cssModules(styles, {allowMultiple: true})
export default class ContentEditable extends React.Component {

  static propTypes = {
    html: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onBlur: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    // return this.props.html !== nextProps.html;
    return this.markupHasChanged(nextProps.html);
  }

  componentWillUpdate() {
    if ( this.markupHasChanged(this.props.html) ) {
      this.refs.contentEditor.innerHTML = this.props.html;
    }
  }

  markupHasChanged(html) {
    return html !== this.refs.contentEditor.innerHTML;
  }

  handleBlur = (evt) => {
    this.props.onBlur();
    this.handleInput(evt);
  }

  handleInput = (evt) => {
    const html = this.refs.contentEditor.innerHTML;
    const emit = (html === this.props.placeholder) ? '' : html;

    if (this.props.onChange && emit !== this.lastHtml) {
      evt.target = { value: emit };
      this.props.onChange(evt);
    }

    this.lastHtml = emit;
  }

  render() {
    const props = _.omit(this.props, 'styles');
    return (
      <div ref="contentEditor"
      styleName="textarea"
      {...props}
      onFocus={this.handleBlur}
      onInput={this.handleInput}
      onBlur={this.handleBlur}
      contentEditable
      dangerouslySetInnerHTML={{__html: props.html}}></div>
    );
  }

}

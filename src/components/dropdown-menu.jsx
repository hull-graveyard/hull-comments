import React from 'react';
import cx from 'classnames';
import styles from '../styles/dropdown-menu.css';
import cssModules from 'react-css-modules';


@cssModules(styles, {allowMultiple: true})
export default class DropdownMenu extends React.Component {


  static propTypes = {
    onSelect: React.PropTypes.func,
    options: React.PropTypes.array,
    value: React.PropTypes.string,
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    right: React.PropTypes.bool,
    children: React.PropTypes.any,
    component: React.PropTypes.oneOfType([
      React.PropTypes.element,
      React.PropTypes.string,
    ]),
    open: React.PropTypes.bool,
  }

  static defaultProps = { component: 'span' };
  state = { opened: this.props.open };

  getTitle() {
    if (this.props.title) {
      return this.props.title;
    } else if (this.props.value) {
      return this.props.value.label;
    }
    return null;
  }

  handleSelect = (selected, evt) => {
    evt.preventDefault();

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(selected);
    }

    if (typeof selected.onClick === 'function') {
      selected.onClick(evt, selected);
    }
    this.close();
  }

  handleToggle = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.setState({ opened: !this.state.opened });
  }

  handleOnBlur = () => {
    this.setState({ opened: false });
  }

  close() {
    if (this.state.opened) {
      this.setState({ opened: false });
    }
  }


  renderOptions() {
    if (!this.props.options) { return null; }

    return (
      <ul styleName={cx({dropdown: true, open: !!this.state.opened, right: !!this.props.right})}>
        {this.props.options.map(function(opt, i) {
          const selected = (this.props.value === opt.value);
          return (
            <li key={`${opt.value}-${i}`} styleName={cx({item: true, selected: selected})}>
              <a href="#" styleName="anchor" onClick={this.handleSelect.bind(this, opt)}>{opt.label || opt.value}</a>
            </li>
          );
        }, this)}
      </ul>
    );
  }

  render() {
    const Component = this.props.component || 'span';

    return (
      <Component styleName="container" onBlur={this.handleOnBlur}>
        <a href="#" styleName="link" onClick={this.handleToggle}>{this.getTitle()}</a>
        {this.renderOptions()}
        {this.props.children}
      </Component>
    );
  }
}

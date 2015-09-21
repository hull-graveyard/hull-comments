import React from 'react';
import cx from 'classnames';
import assign from 'object-assign';

var DropdownMenu = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func,
    options: React.PropTypes.array,
    value: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      component : 'li'
    };
  },

  getInitialState() {
    return { opened: this.props.open }
  },

  close() {
    if (this.state.opened) {
      this.setState({ opened: false });
    }
  },

  toggle(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ opened: !this.state.opened });
  },

  handleSelect(selected, evt) {
    evt.preventDefault();

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(selected);
    }

    if (typeof selected.onClick === 'function') {
      selected.onClick(evt, selected);
    }
    this.close();
  },

  getTitle() {
    if (this.props.title) {
      return this.props.title;
    } else if (this.props.value) {
      return this.props.value.label;
    }
    return null;
  },

  renderOptions(){
    if(!this.props.options){ return null; }
    let dropdownClass = cx({
      'f-dropdown':true,
      'dropdown-right':!!this.props.right
    });

    return <ul className={dropdownClass}>
      {this.props.options.map(function(opt, i) {
        let liClass = (this.props.value === opt.value) ? 'dropdown__item selected' : 'dropdown__item';
        return <li key={opt.value} className={liClass}>
          <a href='#' className='dropdown__anchor' onClick={this.handleSelect.bind(this, opt)}>{opt.label || opt.value}</a>
        </li>;
      }, this)}
    </ul>;
  },

  render() {
    if(this.props.component=='button'){
      var Component = 'span';
      var ButtonComponent = 'button'
      this.props.btnClass=`${this.props.btnClass} dropdown`
    } else {
      var ButtonComponent = 'a';
      var Component = this.props.component;
    }
    var parentClass = (typeof this.props.className === 'string')?{[this.props.className]:true}:this.props.className
    var className = assign({open:this.state.opened, 'dropdown-container':true}, parentClass);

    return <Component className={cx(className)} onClick={this.onSelfClick}>
      <ButtonComponent href='#' className={this.props.btnClass} onClick={this.toggle}>{this.getTitle()}</ButtonComponent>
      {this.renderOptions()}
      {this.props.children}
    </Component>;
  }
});

module.exports = DropdownMenu;

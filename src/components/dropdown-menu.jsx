import React from 'react';
import cx from 'react/lib/cx';
import assign from 'object-assign';

var DropdownMenu = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func,
    options: React.PropTypes.array,
    value: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      component : 'li'
    };
  },

  getInitialState: function() {
    return { opened: this.props.open }
  },

  close: function() {
    if (this.state.opened) {
      this.setState({ opened: false });
    }
  },

  toggle: function(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({ opened: !this.state.opened });
  },

  handleSelect: function(selected, evt) {
    evt.preventDefault();

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(selected);
    }

    if (typeof selected.onClick === 'function') {
      selected.onClick(evt, selected);
    }
    this.close();
  },

  getTitle: function() {
    if (this.props.title) {
      return this.props.title;
    } else if (this.props.value) {
      return this.props.value.label;
    }
    return null;
  },

  renderOptions(){
    if(!this.props.options){ return null; }
    var dropdownClass = {
      'f-dropdown':true,
      'dropdown-right':!!this.props.right
    };
    return <ul className={cx(dropdownClass)}>
      {this.props.options.map(function(opt, i) {
        return <li key={opt.value} className={cx({ selected: this.props.value === opt.value })}>
          <a href="#" onClick={this.handleSelect.bind(this, opt)}>
            {opt.label || opt.value}
          </a>
        </li>;
      }, this)}
    </ul>;
  },

  render: function() {
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
    return <Component {...this.props} className={cx(className)} onClick={this.onSelfClick}>
      <ButtonComponent href='#' className={this.props.btnClass} onClick={this.toggle}>{this.getTitle()}</ButtonComponent>
      {this.renderOptions()}
      {this.props.children}
    </Component>;
  }
});

module.exports = DropdownMenu;

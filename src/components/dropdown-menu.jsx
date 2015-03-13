import React from 'react';
import cx from 'react/lib/cx';
import assign from 'object-assign';

var DropdownMenu = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func,
    options: React.PropTypes.array,
    value: React.PropTypes.string
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
    var title;
    if (this.props.title) {
      title = this.props.title;
    } else if (this.props.value) {
      title = this.props.value.label;
    }
    return title;
  },

  render: function() {
    var Component = this.props.component || "li";
    var parentClass = (typeof this.props.className === 'string')?{[this.props.className]:true}:this.props.className
    var className = assign({open:this.state.opened, 'dropdown-container':true}, parentClass);
    var dropdownClass = {
      'f-dropdown':true,
      'dropdown-right':!!this.props.right
    };

    return <Component {...this.props} className={cx(className)} onClick={this.onSelfClick}><a href='#' onClick={this.toggle}>{this.getTitle()}</a>
      <ul className={cx(dropdownClass)}>
        {this.props.options.map(function(opt, i) {
          return <li key={opt.value} className={cx({ selected: this.props.value === opt.value })}>
            <a href="#" onClick={this.handleSelect.bind(this, opt)}>
              {opt.label || opt.value}
            </a>
          </li>;
        }, this)}
      </ul>
    </Component>;
  }
});

module.exports = DropdownMenu;

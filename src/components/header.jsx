var React = require('react');
var cx = require('react/lib/cx');


function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var DropdownMenu = require('./dropdown-menu');

var UserMenu = React.createClass({

  handleChange: function(item) {
    switch(item.value) {
      case 'logout':
        this.props.actions.logout();
        break;
      case 'profile':
        break;
    }
  },

  login: function(selected) {
    this.props.actions.login(selected.value);
  },

  renderAuthenticated: function() {
    var user = this.props.user;
    var menuItems = [
      { label: "Your Profile", value: "profile" },
      { label: "Logout", value: "logout" }
    ];

    return <DropdownMenu
      className={'user-menu'}
      component="li"
      options={menuItems}
      title={user.name || user.email}
      onSelect={this.handleChange} />;
  },

  renderAnonymous: function() {
    var loginOptions = this.props.providers.map(function(provider) {
      return { label: capitalize(provider.name), value: provider.name };
    }, this);

    return <DropdownMenu className="user-menu"
              component="li"
              options={loginOptions}
              onSelect={this.login}
              title="Login" />;
  },

  render: function() {
    return this.props.user ? this.renderAuthenticated() : this.renderAnonymous();
  }

});


var CommentsHeader = React.createClass({

  propTypes: {
    orderBy: React.PropTypes.string
  },

  getDefaultProps: function() {
    return { orderBy: 'newest' };
  },

  toggleProfile: function() {
    debugger
  },

  render: function() {
    return <header>
      <nav className="nav nav-primary">
        <ul>
          <li className="tab-conversation active">
            <a>
              <span className="comment-count">
                {this.props.comments.length} Comments
              </span>
            </a>
          </li>
          <UserMenu {...this.props} />
        </ul>
      </nav>
    </header>;
  }
});


module.exports = CommentsHeader;

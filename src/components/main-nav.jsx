import React        from 'react';
import cx           from 'classnames';
import UserMenu     from './user-menu';
import SortMenu from './sort-menu';
import ShareMenu from './share-menu';
import FavoritesButton from './favorites-button';
import { translate } from '../lib/i18n';

var MainHeader = React.createClass({
  propTypes: {
    orderBy: React.PropTypes.string
  },

  getInitialState() {
    return {
      expanded:false
    };
  },

  getDefaultProps() {
    return { orderBy: 'newest' };
  },

  toggleNavBar(){
    this.setState({expanded:!this.state.expanded});
  },

  renderMenuToggle(){
    return <li className="toggle-topbar menu-icon"><a href="#" onClick={this.toggleNavBar}>{translate('Menu')}</a></li>
  },

  render() {
    var navClasses = cx({
      'main-bar': true,
      'nav-bar': true,
      'top-bar': true,
      'expanded': true
    });

    return <nav className={navClasses}>
      <section className="top-bar-section">
        <ul className="main-bar__menu left">
          <li className="name">
            <a>{translate('{count, plural, =0 {No comments} =1 {One comment} other {# Comments}}', { count: this.props.commentsCount })}</a>
          </li>
        </ul>
        <ul className="right">
          <UserMenu {...this.props} />
        </ul>
      </section>
      <section className="top-bar-section" style={{clear:'both', border:'1px solid #eee'}}>
        <ul className="main-bar__menu left">
          <ShareMenu component='li' {...this.props} />
          <li>
            <FavoritesButton {...this.props}/>
          </li>
        </ul>
        <ul className="right">
          <li>
            <SortMenu {...this.props} />
          </li>
        </ul>
      </section>
    </nav>;
  }
});

module.exports = MainHeader;

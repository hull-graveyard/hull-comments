import React from 'react';
import SortMenu from './sort-menu';
import ShareMenu from './share-menu';
import FavoritesButton from './favorites-button';

var SubHeader = React.createClass({
  render: function() {
    return <nav className="secondary-bar nav-bar">
      <section className="top-bar-section">
        <ul className="left">
          <SortMenu {...this.props} />
        </ul>
        <ul className="left">
          <FavoritesButton {...this.props}/>
          <ShareMenu {...this.props} right={false} />
        </ul>
      </section>
    </nav>;
  }
});

module.exports = SubHeader;

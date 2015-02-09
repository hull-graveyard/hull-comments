var React = require('react');
var cx = require('react/lib/cx');

var Comment = require('./comment');
var CommentForm = require('./comment-form');
var DropdownMenu = require('./dropdown-menu');
var ShareMenu = require('./share-menu');

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var SortMenu = React.createClass({

  handleChange: function(val) {
    this.props.actions.orderBy(val.value);
  },

  getTitle: function() {
    return capitalize(this.props.orderBy);
  },

  getOptions: function() {
    return ['newest', 'oldest', 'best'].map(function(opt) {
      return { value: opt, label: capitalize(opt) }
    });
  },

  render: function() {
    return <DropdownMenu
      className="sorting"
      component="li"
      options={this.getOptions()}
      title={this.getTitle()}
      value={this.props.orderBy}
      onSelect={this.handleChange} />
  }
});


var NavSecondary = React.createClass({

  toggleFavorite: function(e) {
    e.preventDefault();
    this.props.actions.toggleFavorite();
  },

  render: function() {
    return <div className="nav nav-secondary">
      <ul>
        <SortMenu {...this.props} />
        <li className="favorite pull-right">
          <div className={cx({"thread-likes" : true, upvoted: !!this.props.isFavorite })}>
            <a href="#" onClick={this.toggleFavorite}>
              <span className="label">Favorite</span> <span className="icon-star" />
            </a>
          </div>
        </li>
        <ShareMenu {...this.props} />
      </ul>
    </div>;
  }

});



var Posts = React.createClass({

  loadMore: function(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.props.actions.fetchMore();
  },

  render: function() {
    return <div>
      <div style={{ marginBottom: 24 }}><CommentForm {...this.props} /></div>
      <ul className="post-list">
        {this.props.comments.map(function(comment, i) {
          return  <Comment key={"comment-" + (comment.id || i)} {...this.props} comment={comment} />;
        }, this)}
      </ul>
      <div className="load-more hide" data-role="more">
        <a onClick={this.loadMore} className="btn">Load more comments</a>
      </div>
    </div>
  }

});

var Conversation = React.createClass({

  render: function() {
    return (
      <section>
        <NavSecondary {...this.props} />
        <Posts {...this.props} />
      </section>
    );
  }
});

module.exports = Conversation;

import _ from './lodash';
import assign from 'object-assign';
var Emitter = require('events').EventEmitter;
import MessageFormat from 'messageformat';

var throwErr = function(err){
  console.log(err)
}

var ACTIONS = [
  'toggleForm',
  'signup',
  'login',
  'logout',
  'resetPassword',
  'clearErrors',
  'linkIdentity',
  'unlinkIdentity',
  'fetchComments',
  'updateComment',
  'postComment',
  'deleteComment',
  'orderBy',
  'fetchMore',
  'upVote',
  'downVote',
  'share',
  'toggleFavorite',
  'flag'
];

var STATUS = {
  login: '_isLoggingIn',
  logout: '_isLoggingOut',
  linkIdentity: '_isLinking',
  unlinkIdentity: '_isUnlinking'
};

var SORT_OPTIONS = {
  newest: 'created_at DESC',
  oldest: 'created_at ASC',
  best: 'stats.reviews.sum DESC'
};

var EVENT = 'CHANGE';

function processCommentVotes(distribution) {
  return _.reduce(distribution, function(m, v, k) {
    k = parseInt(k, 10);

    if (k > 0) { m.up += v }
    if (k < 0) { m.down += v }

    return m;
  }, { up: 0, down: 0 });
}

function processComment(raw) {
  raw.votes = processCommentVotes((raw.stats.reviews && raw.stats.reviews.distribution) || {});

  return raw;
}

function Engine(deployment, hull) {
  this.hull = hull;
  this.entity_id = deployment.settings.entity_id;
  this._ship = deployment.ship || deployment.deployable;
  this._platform = deployment.platform;
  this._orderBy = deployment.settings.orderBy || 'newest';
  this._deployment = deployment;
  this.resetState();

  this.resetUser();

  function onChange() {
    this.resetUser();
    this.emitChange();
  }

  this.hull.on('hull.user.*', onChange.bind(this));

  this.emitChange();
  this.fetchComments();
}

assign(Engine.prototype, Emitter.prototype, {
  getActions: function() {
    if (this._actions) { return this._actions; }
    var instance = this;
    this._actions = ACTIONS.reduce(function(m, a) {
      m[a] = instance[a].bind(instance);
      return m;
    }, {});

    return this._actions;
  },

  getState: function() {
    var state = {
      settings: this._ship.settings,
      user: this._user ? this._user : undefined,
      identities: this._identities,
      providers: this.getProviders(),
      error: this._error,
      status: this._status,
      isInitializing: this._isInitializing,
      isWorking: this._isLoggingIn || this._isLoggingOut || this._isLinking || this._isUnlinking,
      isLoggingIn: this._isLoggingIn,
      isLoggingOut: this._isLoggingOut,
      isLinking: this._isLinking,
      isUnlinking: this._isUnlinking,
      isFetching: !!this._isFetching,
      isPosting: !!this._isPosting,
      isFavorite: !!this._isFavorite,
      comments: this.getComments(),
      orderBy: this._orderBy,
      isReady: !!this._isReady,
      hasMore: this._hasMore,
      commentsCount: this._commentsCount,
      formIsOpen: !!this._formIsOpen
    };
    return state;
  },

  getComments: function() {
    var orderBy = this._orderBy;

    var comments = (this._comments || []).slice();
    comments.sort(function(a, b) {
      var da = new Date(a.created_at);
      var db = new Date(b.created_at);
      var ret = 0;
      if (da > db) {ret =  -1; } else {ret = 1;}
      if (orderBy === 'oldest') {
        return -1 * ret;
      } else {
        return ret;
      }
    });

    return comments;
  },

  addChangeListener: function(listener) {
    this.addListener(EVENT, listener)
  },

  removeChangeListener: function(listener) {
    this.removeListener(EVENT, listener);
  },

  emitChange: function(message) {
    if (this.hull.config().debug){
      console.log(message);
    }
    this.emit(EVENT);
  },

  resetState: function() {
    this.resetTranslations();
    this.resetUser();

    this._page = 1;
    this._comments = [];
    this._commentsById = {};
    this._hasMore = true;
    this._error = null;
    this._status = {};
    this._isLoggingIn = false;
    this._isLoggingOut = false;
    this._isLinking = false;
    this._isUnlinking = false;
    this._isFavorite = null;
  },

  resetUser: function() {
    this._user = this.hull.currentUser();

    var identities = {}
    if (this._user) {
      this._user.identities.forEach(function(identity) {
        identities[identity.provider] = true;
      });
    }

    this._identities = identities;
    this.fetchIsFavorite();
  },

  resetTranslations: function() {
    this._translations = {};

    var translations = this._ship.translations['en'];
    var mf = new MessageFormat('en');
    for (var k in translations) {
      if (translations.hasOwnProperty(k)) {
        this._translations[k] = mf.compile(translations[k]);
      }
    }
  },

  getProviders: function() {
    var providers = [];

    var services = this.hull.config().services.auth;
    for (var k in services) {
      if (services.hasOwnProperty(k) && k !== 'hull') {
        var provider = { name: k };
        provider.isLinked = !!this._identities[k];
        provider.isUnlinkable = provider.isLinked && this._user.main_identity !== k;

        providers.push(provider);
      }
    }

    return providers;
  },

  toggleForm: function() {
    this._formIsOpen = !this._formIsOpen;

    this.emitChange();
  },

  login: function(options, source) {
    this.perform('login', options);
  },

  resetPassword: function(options={}){
    this.hull.api("/users/request_password_reset", "post", options, function(r) {
      this._error=null,
      this._status.resetPassword={
        message:this.translate("Email sent to {email}. Check your inbox!",options)
      }
      this.emitChange()
    }.bind(this), function(error) {
      this._error=error
      delete this._status.resetPassword;
      this.emitChange()
    }.bind(this));
  },

  clearErrors: function() {
    this._error=null;
    this._status={};
    this.emitChange()
  },

  logout: function() {
    this.hull.logout();
  },

  linkIdentity: function(provider) {
    this.perform('linkIdentity', {provider});
  },

  unlinkIdentity: function(provider) {
    this.perform('unlinkIdentity', {provider});
  },

  signup: function(user) {
    this.perform('signup', user);
  },

  perform: function(method, options={}) {
    var s = STATUS[method];
    var provider = options.provider || 'email'
    this[s] = provider;
    this._error = null;

    this.emitChange();

    if (this._platform.type === 'platforms/shopify') {
      options.redirect_url = document.location.origin + '/a/hull-callback';
    }

    var promise = Hull[method](options);
    promise.then(function(){
      this.resetUser();
      this[s] = false;
      this._error = null;
      this.emitChange();
    }.bind(this), function(error){
      // Quick fix...
      if (error.response != null) { error = error.response; }

      this[s] = false;
      error.provider = provider;
      this._error = error;
      this.emitChange();
    }.bind(this));

    return promise;
  },

  fetchIsFavorite: function() {
    var self = this;
    if (this._user) {
      this.hull.api('me/liked/' + this.entity_id).then(function(res) {
        self._isFavorite = res;
        self.emitChange('fetched _isFavorite');
      }, function(err) {
        self._isFavorite = false;
        self.emitChange('fetched _isFavorite');
      }).catch(throwErr);
    }
  },

  fetchComments: function(params) {
    if (!this._isFetching) {
      params = assign({}, params, {
        wrapped: true,
        nested: true,
        page: this._page,
        per_page: 50,
        order_by: SORT_OPTIONS[this._orderBy]
      });

      this._isFetching = this.hull.api(this.entity_id + '/comments', params);

      this._isFetching.then(function(r) {
        this._isReady = true;
        this._isFetching = false;
        this._hasMore = !!r.pagination.next_url;
        this._commentsCount = r.tree.total;
        this._comments = this._comments.concat(r.data);
        this._processComments(r.data);

        this.emitChange('fetching ok');
      }.bind(this), function(e) {
        this._isFetching = false;
        this.emitChange('fetching error: ' + e.message);
      }.bind(this)).catch(throwErr);

      this.emitChange('start fetching');
    }

    return this._isFetching;
  },

  fetchMore: function(params) {
    if (!this._hasMore) { return; }

    if (!this._isFetching) {
      this._page = this._page + 1;

      this.fetchComments();
    }
  },

  orderBy: function(sortKey) {
    this._orderBy = SORT_OPTIONS[sortKey] ? sortKey : 'newest';

    this._page = 1;
    this._commentsById = {};
    this._comments = [];

    this.fetchComments();
  },

  deleteComment: function(id) {
    let c = this._commentsById[id];

    if (c == null) { return; }

    c['deleted_at'] = new Date();
    this.hull.api(c.id, 'delete');

    this.emitChange();
  },

  postComment: function(text, parentId) {

    if (this._isPosting) return false;

    if (!!this._deployment.ship.settings.allow_guest || this._user) {
      var d = new Date();
      var comment = { description: text, extra: { }, created_at: d };
      var c = { description: text, user: (this._user || {}), created_at: d }
      if (parentId == null) {
        var i = this._comments.push(c) - 1;
      } else {
        comment['parent_id'] = parentId;
        var p = this._commentsById[parentId];
        p.children = p.children || [];
        var i = p.children.push(c) - 1;
      }

      this._isPosting = this.hull.api(this.entity_id + '/comments', 'post', comment);
      this._isPosting.then((r)=>{
        if (parentId == null) {
          this._comments[i] = r;
        } else {
          this._commentsById[parentId].children[i] = r;
        }
        r.votes = { up: 0, down: 0 };
        this._commentsById[r.id]= r;
        this._commentsCount++;
        this._isPosting = false;
        this.emitChange('comment is now posted');
      }, ()=>{
        this._isPosting = false;
        this._comments.pop();
        this.emitChange();
      }).catch(throwErr);

      this.emitChange('stared posting a comment...');
    } else {
      return false;
    }
  },

  updateComment: function(text, id) {
    if (id && text) {
      var c = this._commentsById[id];

      var self = this;
      return this.hull.api(id, 'put', { description: text }).then(function(r) {
        assign(c, r);
        self.emitChange();
      }).catch(throwErr);
    }
  },

  vote: function(id, rating) {
    var c = this._commentsById[id];

    this.hull.api(id + '/reviews', 'post', { rating: rating }).then(function(r) {
      c.votes = processCommentVotes(r.ratings.distribution);
      this.emitChange('Update comment score');
    }.bind(this)).catch(throwErr);
  },

  upVote: function(id) {
    this.vote(id, 1);
  },

  downVote: function(id) {
    this.vote(id, -1);
  },

  share: function(provider) {
    this.hull.share({
      provider: provider,
      anonymous: true,
      params: {
        display: 'popup'
      }
    });
  },

  toggleFavorite: function() {
    if (this._user)  {
      var self = this;
      var refresh = function() {
        self.fetchIsFavorite();
      }
      if (this._isFavorite) {
        this._isFavorite = false;
        this.hull.api(this.entity_id + '/likes','delete').then(refresh, refresh);
      } else {
        this._isFavorite = true;
        this.hull.api(this.entity_id + '/likes','post').then(refresh, refresh);
      }
      this.emitChange()
    }
  },

  flag: function(commentId) {
    if (commentId) {
      return this.hull.api(commentId + '/flag', 'post').catch(throwErr);
    }
  },

  translate: function(message, data) {
    var m = this._translations[message];

    if (m == null) { return message; }

    return m(data);
  },

  _processComments(comments) {
    _.each(comments, function(raw) {
      let c = processComment(raw);
      this._commentsById[c.id] = c;
      this._processComments(c.children);
    }, this);
  }
});

module.exports = Engine;


import assign from 'object-assign';
var Emitter = require('events').EventEmitter;
import IntlMessageFormat from 'intl-messageformat';
import sanitize from 'sanitize-caja';

var ACTIONS = [
  'signup',
  'login',
  'logout',
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
  login: '_isLogingIn',
  logout: '_isLogingOut',
  linkIdentity: '_isLinking',
  unlinkIdentity: '_isUnlinking'
};

var SORT_OPTIONS = {
  newest: 'created_at DESC',
  oldest: 'created_at ASC',
  best: 'stats.reviews.sum DESC'
};

var EVENT = 'CHANGE';

function Engine(deployment) {
  this.entity_id = deployment.settings.entity_id;
  this._ship = deployment.ship || deployment.deployable;
  this._platform = deployment.platform;
  this._orderBy = deployment.settings.orderBy || 'newest';
  this._settings = deployment.settings;
  this.resetState();

  this.resetUser();

  function onChange() {
    this.resetUser();
    this.emitChange();
  }

  Hull.on('hull.user.*', onChange.bind(this));

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
      isInitializing: this._isInitializing,
      isWorking: this._isLogingIn || this._isLogingOut || this._isLinking || this._isUnlinking,
      isLogingIn: this._isLogingIn,
      isLogingOut: this._isLogingOut,
      isLinking: this._isLinking,
      isUnlinking: this._isUnlinking,
      isFetching: !!this._isFetching,
      isPosting: !!this._isPosting,
      isFavorite: !!this._isFavorite,
      comments: this.getComments(),
      orderBy: this._orderBy,
      isReady: !!this._isReady
    };
    return state;
  },

  getComments: function() {
    var orderBy = this._orderBy;
    var comments = (this._comments || []).slice();
    var myComments = comments.sort(function(a, b) {
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
    return myComments;
  },

  addChangeListener: function(listener) {
    this.addListener(EVENT, listener)
  },

  removeChangeListener: function(listener) {
    this.removeListener(EVENT, listener);
  },

  emitChange: function(message) {
    if (Hull.config().debug){

    }
    console.log(message);
    this.emit(EVENT);
  },

  resetState: function() {
    this.resetTranslations();
    this.resetUser();

    this._error = null;
    this._isLogingIn = false;
    this._isLogingOut = false;
    this._isLinking = false;
    this._isUnlinking = false;
    this._isFavorite = null;
  },

  resetUser: function() {
    this._user = Hull.currentUser();

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
    for (var k in translations) {
      if (translations.hasOwnProperty(k)) {
        this._translations[k] = new IntlMessageFormat(translations[k], 'en-US');
      }
    }
  },

  getProviders: function() {
    var providers = [];

    var services = Hull.config().services.auth;
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

  login: function(provider) {
    this.perform('login', provider);
  },

  logout: function() {
    Hull.logout();
  },

  linkIdentity: function(provider) {
    this.perform('linkIdentity', provider);
  },

  unlinkIdentity: function(provider) {
    this.perform('unlinkIdentity', provider);
  },

  signup: function(user) {
    return Hull.signup(user);
  },

  perform: function(method, provider) {
    var s = STATUS[method];

    this[s] = provider;
    this._error = null;

    this.emitChange();

    var options = { provider: provider };
    if (this._platform.type === 'platforms/shopify') {
      options.redirect_url = document.location.origin + '/a/hull-callback';
    }

    // TODO add redirect to options

    var promise = Hull[method](options);
    promise.then(function() {
      this.resetUser();

      this[s] = false;
      this._error = null;

      this.emitChange();
    }.bind(this), function(error) {
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
      Hull.api('me/liked/' + this.entity_id).then(function(res) {
        self._isFavorite = res;
        self.emitChange('fetched _isFavorite');
      }, function(err) {
        self._isFavorite = false;
        self.emitChange('fetched _isFavorite');
      }).done();
    }
  },

  fetchComments: function(params) {
    if (!this._isFetching) {
      this._lastPage = 0;
      var prms = assign({}, params, {
        order_by: SORT_OPTIONS[this._orderBy]
      });
      this._isFetching = Hull.api(this.entity_id + "/comments", prms);
      this._isFetching.then((comments)=> {
        this._isReady = true;
        this._isFetching = false;
        this._comments = comments;
        this.emitChange('fetching ok');
      }, (err)=> {
        this._isFetching = false;
        this.emitChange('fetching error: ' + err.message);
      }).done();
      this.emitChange('start fetching');
    }
    return this._isFetching;
  },

  fetchMore: function(params) {
    this._lastPage = this._lastPage ? (this._lastPage + 1) : 2;
    if (!this._isFetching) {
      var prms = assign({}, params, { order_by: SORT_OPTIONS[this._orderBy], page: this._lastPage });

      this._isFetching = Hull.api(this.entity_id + "/comments", prms)

      this._isFetching.then((comments)=>{
        this._isFetching = false;
        this._comments = (this._comments || []).concat(comments);
        this.emitChange('fetching ok');
      })
      .fail((err)=>{
        this._isFetching = false;
        this.emitChange('fetching error: ' + err);
      })
      .fail((err)=>{
        console.log(err.stack);
      })
      .done();

      this.emitChange('start fetching');
    }
  },

  orderBy: function(sortKey) {
    this._orderBy = SORT_OPTIONS[sortKey] ? sortKey : 'newest';
    this.fetchComments();
  },

  deleteComment: function(id) {
    if (!id) return false;
    var found = false;
    this._comments = this._comments.map(function(comment) {
      if (comment && comment.id === id) {
        found = comment;
        comment._isDeleting = true;
        Hull.api(comment.id, 'delete', { description: "[deleted]" }).then((res)=> {
          found = res;
          this._comments = this._comments.filter(function(c) { return c.id != id; });
          this.emitChange('deleted ok');
        }, (err)=> {
          found._isDeleting = false;
          this.emitChange("error deleting comment: ", err.toString());
        }).done();
      }
      return comment;
    }, this);
    this.emitChange('marked as deleting');
  },

  postComment: function(text, inReplyTo) {
    text = sanitize(text);

    if (this._isPosting) return false;

    if (!!this._settings.allow_guest || this._user) {
      this._comments = this._comments || [];

      var comment = { description: text, extra: { }, created_at: new Date() };
      this._comments.push({ description: text, user: (this._user || {}), created_at: new Date() });

      this._isPosting = Hull.api(this.entity_id + '/comments', 'post', comment);
      this._isPosting.then(()=>{
        this.emitChange('comment is now posted, refetching to be sure...');
        this._isPosting = false;
        this.fetchComments();
      }, ()=>{
        this._isPosting = false;
        this._comments.pop();
        this.emitChange();
      }).done();

      this.emitChange('stared posting a comment...');
    } else {
      return false;
    }
  },

  updateComment: function(text, commentId) {
    if (commentId && text) {
      var self = this;
      return Hull.api(commentId, 'put', { description: text }).then(function() {
        self.fetchComments();
      }).done();
    }
  },

  upVote: function(id) {
    var self = this;
    Hull.api(id + '/reviews', 'post', { rating: 1 }).then(function(res) {
      self.fetchComments();
    }).done();
  },

  downVote: function(id) {
    var self = this;
    Hull.api(id + '/reviews', 'post', { rating: -1 }).then(function(res) {
      self.fetchComments();
    }).done();
  },

  share: function(provider) {
    Hull.share({
      provider: provider,
      method: 'share',
      anonymous: true,
      params: {
        display: 'popup',
        href: document.location.toString()
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
        Hull.api(this.entity_id + '/likes','delete').then(refresh, refresh).done();
      } else {
        this._isFavorite = true;
        Hull.api(this.entity_id + '/likes','post').then(refresh, refresh).done();
      }
      this.emitChange()
    }
  },

  flag: function(commentId) {
    if (commentId) {
      return Hull.api(commentId + '/flag', 'post').done();
    }
  },

  translate: function(message, data) {
    var m = this._translations[message];

    if (m == null) { return message; }

    return m.format(data);
  }

});

module.exports = Engine;


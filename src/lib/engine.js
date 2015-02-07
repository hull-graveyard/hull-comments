var assign = require('object-assign');
var Emitter = require('events').EventEmitter;
var IntlMessageFormat = require('intl-messageformat');

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

function isMobile() {
  var n = navigator.userAgent || navigator.vendor || window.opera;
  return !!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(n) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(n.substr(0, 4));
};


function Engine(deployment) {
  this.entity_id = deployment.settings.entity_id;
  this._ship = deployment.ship || deployment.deployable;
  this._platform = deployment.platform;
  this._orderBy = deployment.settings.orderBy || 'newest';
  this.resetState();

  this.resetUser();

  function onChange() {
    this.resetUser();
    this.emitChange();
  }

  Hull.on('hull.auth.*', onChange.bind(this));

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
      if (da > db) {
        ret =  -1;
      } else {
        ret = 1;
      }
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
    if (isMobile()) { options.strategy = 'redirect'; }
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
      });
    }

  },


  fetchComments: function(params) {
    if (!this._isFetching) {
      this._lastPage = 0;
      var prms = assign({}, params, {
        order_by: SORT_OPTIONS[this._orderBy]
      });
      this._isFetching = Hull.api(this.entity_id + "/comments", prms);
      this._isFetching.then(function(comments) {
        this._isReady = true;
        this._isFetching = false;
        this._comments = comments;
        this.emitChange('fetching ok');
      }.bind(this), function(err) {
        this._isFetching = false;
        this.emitChange('fetching error: ' + err.toString());
      });
      this.emitChange('start fetching');
    }
    return this._isFetching;
  },

  fetchMore: function(params) {
    this._lastPage = this._lastPage ? (this._lastPage + 1) : 2;
    if (!this._isFetching) {
      var prms = assign({}, params, {
        order_by: SORT_OPTIONS[this._orderBy],
        page: this._lastPage
      });
      this._isFetching = Hull.api(this.entity_id + "/comments", prms);
      this._isFetching.then(function(comments) {
        this._isFetching = false;
        this._comments = (this._comments || []).concat(comments);
        this.emitChange('fetching ok');
      }.bind(this), function(err) {
        this._isFetching = false;
        this.emitChange('fetching error: ' + err.toString());
      });
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
        Hull.api.delete(comment.id, { description: "[deleted]" }).then(function(res) {
          found = res;
          this._comments = this._comments.filter(function(c) { return c.id != id; });
          this.emitChange('deleted ok');
        }.bind(this), function(err) {
          found._isDeleting = false;
          this.emitChange("error deleting comment: ", err.toString());
        }.bind(this));
      }
      return comment;
    }, this);
    this.emitChange('marked as deleting');
  },

  postComment: function(text, inReplyTo) {
    if (this._isPosting) return false;
    if (this._user) {
      this._comments = this._comments || [];
      var comment = { description: text, extra: { }, created_at: new Date() };
      this._comments.push({ description: text, user: this._user, created_at: new Date() });
      this._isPosting = Hull.api.post(this.entity_id + "/comments", comment);
      this._isPosting.then(function() {
        this.emitChange('comment is now posted, refetching to be sure...');
        this._isPosting = false;
        this.fetchComments();
      }.bind(this), function() {
        this._isPosting = false;
        this._comments.pop();
        this.emitChange();
      });
      this.emitChange('stared posting a comment...');
    } else {
      return false;
    }
  },

  updateComment: function(text, commentId) {
    if (commentId && text) {
      var self = this;
      return Hull.api.put(commentId, { description: text }).then(function() {
        self.fetchComments();
      });
    }
  },

  upVote: function(id) {
    var self = this;
    Hull.api.post(id + '/reviews', { rating: 1 }).then(function(res) {
      self.fetchComments();
    });
  },

  downVote: function(id) {
    var self = this;
    Hull.api.post(id + '/reviews', { rating: -1 }).then(function(res) {
      self.fetchComments();
    });
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
        Hull.api['delete'](this.entity_id + '/likes').then(refresh, refresh);
      } else {
        this._isFavorite = true;
        Hull.api.post(this.entity_id + '/likes').then(refresh, refresh);
      }
      this.emitChange()
    }
  },

  flag: function(commentId) {
    if (commentId) {
      return Hull.api.post(commentId + '/flag');
    }
  },

  translate: function(message, data) {
    var m = this._translations[message];

    if (m == null) { return message; }

    return m.format(data);
  }

});

module.exports = Engine;


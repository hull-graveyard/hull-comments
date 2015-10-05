import _ from 'lodash';
import { translate } from './i18n';
const Emitter = require('events').EventEmitter;
import assign from 'object-assign';

const throwErr = function(err) {
  console.log(err);
};

const ACTIONS = [
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
  'follow',
  'unFollow',
  'upVote',
  'downVote',
  'share',
  'toggleFavorite',
  'flag',
];

const STATUS = {
  login: '_isLoggingIn',
  logout: '_isLoggingOut',
  linkIdentity: '_isLinking',
  unlinkIdentity: '_isUnlinking',
};

const SORT_OPTIONS = {
  newest: 'created_at DESC',
  oldest: 'created_at ASC',
  best: 'stats.reviews.sum DESC',
};

const EVENT = 'CHANGE';

function processCommentVotes(distribution) {
  return _.reduce(distribution, function(m, v, k) {
    k = parseInt(k, 10);

    if (k > 0) {
      m.up += v;
    }
    if (k < 0) {
      m.down += v;
    }

    return m;
  }, {
    up: 0,
    down: 0,
  });
}

function processComment(raw) {
  raw.votes = processCommentVotes((raw.stats.reviews && raw.stats.reviews.distribution) || {});

  return raw;
}

export default function Engine(deployment, hull) {
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

  updateShip(ship) {
    this._ship = ship;
    this.emitChange();
  },

  getActions() {
    if (this._actions) {
      return this._actions;
    }
    const instance = this;
    this._actions = ACTIONS.reduce(function(m, a) {
      m[a] = instance[a].bind(instance);
      return m;
    }, {});

    return this._actions;
  },

  getState() {
    return {
      settings: this._ship.settings,
      user: this._user ? this._user : null,
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
      followings: this._followings,
      commentsCount: this._commentsCount,
      formIsOpen: !!this._formIsOpen,
    };
  },

  getComments() {
    const orderBy = this._orderBy;

    const comments = (this._comments || []).slice();
    comments.sort(function(a, b) {
      const da = new Date(a.created_at);
      const db = new Date(b.created_at);
      let ret = 0;
      if (da > db) {
        ret = -1;
      } else {
        ret = 1;
      }
      if (orderBy === 'oldest') {
        return -1 * ret;
      }
      return ret;
    });

    return comments;
  },

  addChangeListener(listener) {
    this.addListener(EVENT, listener);
  },

  removeChangeListener(listener) {
    this.removeListener(EVENT, listener);
  },

  emitChange() {
    this.emit(EVENT);
  },

  resetState() {
    this.resetUser();

    this._page = 1;
    this._comments = [];
    this._commentsById = {};
    this._followings = {};
    this._hasMore = true;
    this._error = null;
    this._status = {};
    this._isLoggingIn = false;
    this._isLoggingOut = false;
    this._isLinking = false;
    this._isUnlinking = false;
    this._isFavorite = null;
  },

  resetUser() {
    this._user = this.hull.currentUser();

    const identities = {};
    if (this._user) {
      this._user.identities.forEach(function(identity) {
        identities[identity.provider] = true;
      });
    }

    this._identities = identities;
    this.fetchIsFavorite();
  },

  getProviders() {
    const providers = [];

    const services = this.hull.config().services.auth;
    for (const k in services) {
      if (services.hasOwnProperty(k) && k !== 'hull') {
        const provider = {
          name: k,
        };
        provider.isLinked = !!this._identities[k];
        provider.isUnlinkable = provider.isLinked && this._user.main_identity !== k;

        providers.push(provider);
      }
    }

    return providers;
  },

  toggleForm() {
    this._formIsOpen = !this._formIsOpen;

    this.emitChange();
  },

  login(options) {
    return this.perform('login', options);
  },

  resetPassword(options = {}) {
    this.hull.api('/users/request_password_reset', 'post', options, () => {
      this._error = null;
      this._status.resetPassword = {
        message: translate('Email sent to {email}. Check your inbox!', options),
      };
      this.emitChange();
    }, (error) => {
      this._error = error;
      delete this._status.resetPassword;
      this.emitChange();
    });
  },

  clearErrors() {
    this._error = null;
    this._status = {};
    this.emitChange();
  },

  logout() {
    this.hull.logout();
  },

  linkIdentity(provider) {
    this.perform('linkIdentity', { provider });
  },

  unlinkIdentity(provider) {
    this.perform('unlinkIdentity', { provider });
  },

  signup(user) {
    this.perform('signup', user);
  },

  perform(method, options = {}) {
    const s = STATUS[method];
    const provider = options.provider || 'email';
    this[s] = provider;
    this._error = null;

    this.emitChange();

    if (this._platform.type === 'platforms/shopify') {
      options.redirect_url = document.location.origin + '/a/hull-callback';
    }

    const promise = Hull[method](options);
    promise.then(() => {
      this.resetUser();
      this[s] = false;
      this._error = null;
      this.emitChange();
    }, (error) => {
      // Quick fix...
      if (error.response !== null) {
        error = error.response;
      }
      if (error.error !== null) {
        error = error.error;
      }
      this[s] = false;
      error.provider = provider;
      this._error = error;
      this.emitChange();
    });

    return promise;
  },

  fetchIsFavorite() {
    const self = this;
    if (this._user) {
      this.hull.api('me/liked/' + this.entity_id).then(function(res) {
        self._isFavorite = res;
        self.emitChange('fetched _isFavorite');
      }, function() {
        self._isFavorite = false;
        self.emitChange('fetched _isFavorite');
      }).catch(throwErr);
    }
  },

  fetchComments(params) {
    if (!this._isFetching) {
      params = assign({}, params, {
        wrapped: true,
        nested: true,
        page: this._page,
        per_page: 50,
        order_by: SORT_OPTIONS[this._orderBy],
      });

      this._isFetching = this.hull.api(this.entity_id + '/comments', params);

      this._isFetching.then((r) => {
        this._isReady = true;
        this._isFetching = false;
        this._hasMore = !!r.pagination.next_url;
        this._commentsCount = r.tree.total;
        this._comments = this._comments.concat(r.data);
        this._processComments(r.data);
        Promise.all(this.getFollowings()).then(() => {
          this.emitChange('fetching ok');
        });
      }, (e) => {
        this._isFetching = false;
        this.emitChange('fetching error: ' + e.message);
      }).catch(throwErr);

      this.emitChange('start fetching');
    }

    return this._isFetching;
  },

  fetchMore() {
    if (!this._hasMore) {
      return;
    }

    if (!this._isFetching) {
      this._page = this._page + 1;

      this.fetchComments();
    }
  },

  orderBy(sortKey) {
    this._orderBy = SORT_OPTIONS[sortKey] ? sortKey : 'newest';

    this._page = 1;
    this._commentsById = {};
    this._comments = [];

    this.fetchComments();
  },

  deleteComment(id) {
    const c = this._commentsById[id];

    if (c === null) {
      return;
    }

    c.deleted_at = new Date();
    this.hull.api(c.id, 'delete');

    this.emitChange();
  },

  postComment(text, parentId) {
    if (this._isPosting) return false;

    if (!!this._deployment.ship.settings.allow_guest || this._user) {
      const d = new Date();
      const comment = {
        description: text,
        extra: { },
        created_at: d,
      };
      const c = {
        description: text,
        user: (this._user || {}),
        created_at: d,
      };
      let i;
      if (parentId === null) {
        i = this._comments.push(c) - 1;
      } else {
        comment.parent_id = parentId;
        const p = this._commentsById[parentId];
        p.children = p.children || [];
        i = p.children.push(c) - 1;
      }

      this._isPosting = this.hull.api(this.entity_id + '/comments', 'post', comment);
      this._isPosting.then((r) => {
        if (parentId === null) {
          this._comments[i] = r;
        } else {
          this._commentsById[parentId].children[i] = r;
        }
        r.votes = {
          up: 0,
          down: 0,
        };
        this._commentsById[r.id] = r;
        this._commentsCount++;
        this._isPosting = false;
        this.emitChange('comment is now posted');
      }, () => {
        this._isPosting = false;
        this._comments.pop();
        this.emitChange();
      }).catch(throwErr);

      this.emitChange('stared posting a comment...');
    } else {
      return false;
    }
  },

  updateComment(description, id) {
    if (id && description) {
      const c = this._commentsById[id];

      const self = this;
      return this.hull.api(id, 'put', { description }).then(function(r) {
        assign(c, r);
        self.emitChange();
      }).catch(throwErr);
    }
  },

  vote(id, rating) {
    const c = this._commentsById[id];

    this.hull.api(id + '/reviews', 'post', { rating }).then((r) => {
      c.votes = processCommentVotes(r.ratings.distribution);
      this.emitChange('Update comment score');
    }).catch(throwErr);
  },


  follow(id) {
    this.hull.api('/following/' + id, 'put').then(() => {
      this._followings[id] = true;
      this.emitChange('Following User');
    }).catch(throwErr);
  },

  unFollow(id) {
    this.hull.api('/following/' + id, 'delete').then(() => {
      this._followings[id] = false;
      this.emitChange('Unfollowing User');
    }).catch(throwErr);
  },

  getFollowings() {
    return _.map(this._commentsById, (value) => {
      return this.isFollowing(value.user.id);
    });
  },

  isFollowing(id) {
    if (this._followings.hasOwnProperty(id)) {
      return Promise.resolve(this._followings[id]);
    }
    return this.hull.api('/following/' + id).then((r) => {
      this._followings[id] = !(r===false);
    }).catch(throwErr);
  },

  upVote(id) {
    this.vote(id, 1);
  },

  downVote(id) {
    this.vote(id, -1);
  },

  share(provider) {
    this.hull.share({
      provider: provider,
      anonymous: true,
      params: { display: 'popup' },
    });
  },

  toggleFavorite() {
    if (this._user) {
      const self = this;
      const refresh = function() {
        self.fetchIsFavorite();
      };
      if (this._isFavorite) {
        this._isFavorite = false;
        this.hull.api(this.entity_id + '/likes', 'delete').then(refresh, refresh);
      } else {
        this._isFavorite = true;
        this.hull.api(this.entity_id + '/likes', 'post').then(refresh, refresh);
      }
      this.emitChange();
    }
  },

  flag(commentId) {
    if (commentId) {
      return this.hull.api(commentId + '/flag', 'post').catch(throwErr);
    }
  },

  _processComments(comments) {
    return _.map(comments, function(raw) {
      const c = processComment(raw);
      this._commentsById[c.id] = c;
    }, this);
  },
});

module.exports = Engine;


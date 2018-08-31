var gtagOfflineWrapper = new OfflineEventQue('gtagOffline', gtag);
var localStateString = localStorage.getItem('pocketReporterCustomTemplates');
var customKeys = localStateString ? JSON.parse(localStateString).topics.map(function(item) { return item.id }) : [];


function normaliseWordpressSchema(result) {
  return {
    custom: true,
    icon: 'fa-bookmark',
    id: result.slug,
    name: result.title.rendered,
    questions: result.acf.questions_list.map(function(item) { 
      return {
        key: item.num,
        num: item.num,
        question: removeParagraphTags(item.question),
        custom: true,
      }
    }),
    length: result.acf.questions_list.length,
  }
}



function removeParagraphTags(string) {
  return string.replace(/<[\/]?p>/ig, '');
}


function syncLocalStorage(ids, callback) {
  var updatedState = [];
  var outstandingRequests = 0;
  ids.forEach((id) => {
    outstandingRequests += 1;
    jQuery.ajax(
      'http://18.202.6.42//wp-json/wp/v2/questions?slug=' + id,
      {
        error: function() {
          if (callback) {
            callback(null);
          }
        },

        success: function(response) { 
          outstandingRequests -= 1;

          if (response.length > 0) {
            updatedState.push(normaliseWordpressSchema(response[0]));
          }

          if (outstandingRequests === 0) {
            var newState = {
              topics: updatedState,
              categories: [
                {
                  custom: true,
                  icon: 'fa-plus',
                  id: 'custom',
                  name: 'Custom Templates',
                  topics: updatedState.map(function(item) { return item.id })
                }
              ]
            }

            localStorage.setItem('pocketReporterCustomTemplates', JSON.stringify(newState));

            if (callback) {
              callback(newState);
            }
          }
        },
      }
    )
  });
}


syncLocalStorage(customKeys);


/*** Router ***/
var Router = Backbone.Router.extend({
  routes : {
    "" : "home",
    "stories/:id" : "story",
    "add" : "add",
    "add/:category" : "add",
    "add/:category/:topic" : "add",
    "add-custom": "addCustom",
    "about" : "about",
    "settings": "settings"
  },

  initialize: function() {
    this.footer = new FooterView({el: $('#app-footer')});
  },

  home: function() {
    this.loadView(new HomeView());
  },

  addCustom: function() {
    this.loadView(new AddCustom({category: 'category', topic: 'topic'}));
  },

  story: function(id) {
    var story = PocketReporter.stories.get(id);

    if (story) {
      this.loadView(new StoryView({model: story}));
    } else {
      this.navigate('', {trigger: true});
    }
  },

  add: function(category, topic) {
    this.loadView(new AddStoryView({category: category, topic: topic}));
  },

  about: function() {
    this.loadView(new AboutView());
  },

  settings: function() {
    this.loadView(new SettingsView());
  },

  loadView: function(view) {
    if (this.view) {
      if (this.view.close) {
        this.view.close();
      } else {
        this.view.remove();
      }
    }

    $("#viewport").empty().append(view.el);
    $('body').scrollTop(0);
    this.view = view;
    this.view.trigger('view-inserted');
    this.footer.viewChanged(view);

    this.track();
  },

  track: function() {
    var fragment = Backbone.history.getFragment();
    if (!/^\//.test(fragment)) {
      fragment = '/' + fragment;
    }

    fragment = '/app' + fragment;
    PocketReporter.trackView(fragment);
  }
});


var categoriesPlacholder = [{
  custom: true,
  icon: 'fa-plus',
  id: 'custom',
  name: 'Custom Templates',
  topics: [],
}];


function mergeWebStorageAndLocal() {
  if (!localStateString) {
    return {
      topics: STORYCHECK_TOPICS,
      categories: CATEGORIES.concat(categoriesPlacholder),
    };
  }

  const localState = JSON.parse(localStateString);
  return {
    topics: STORYCHECK_TOPICS.concat(localState.topics),
    categories: CATEGORIES.concat(localState.categories),
  };
}


var currentState = mergeWebStorageAndLocal();


/*** Globals ***/
var PocketReporter = Backbone.Model.extend({
  initialize: function() {
    var self = this;

    this.categoriesList = new CategoriesList(currentState.categories);
    this.topics = new Topics(currentState.topics);
    // storage version
    // NB: changing this will clear all stories when a user next loads the app!
    this.version = 5;

    if ('localStorage' in window) {
      this.storage = localStorage;
    } else {
      this.storage = null;
    }

    // localisation
    // fallback english polyglot
    this.polyglot_en = new Polyglot();
    this.loadLocale(this.polyglot_en, 'en-za');
    this.polyglot = new Polyglot();
    this.polyglot._t = this.polyglot.t;
    this.polyglot.t = _.bind(this.t, this);

    Handlebars.registerHelper("_", function(text) {
      return new Handlebars.SafeString(self.polyglot.t(text));
    });

    this.load();

    var save = _.debounce(_.bind(this.save, this), 300);
    this.state.on('change', save);
    this.state.get('stories').on('change add remove', save);

    this.general();
  },

  // override polyglot.t to track when a key is missing
  t: function(key) {
    if (this.polyglot.has(key)) return this.polyglot._t.apply(this.polyglot, arguments);

    // fall back to the english translation, and log a GA event
    this.trackEvent('l10n-missing', this.polyglot.locale(), key);
    return this.polyglot_en.t.apply(this.polyglot_en, arguments);
  },

  load: function() {
    var val;

    if (this.storage) {
      val = this.storage.getItem('PocketReporter');

      if (val) {
        val = JSON.parse(val);
        // version check
        if (val.version != this.version) val = null;
      }
    }

    if (!val) val = {};

    this.state = new State(val);
    this.state.set('version', this.version);
    this.state.set('stories', new Stories(val.stories, {parse: true}));
    this.state.set('user', new Backbone.Model(val.user, {parse: true}));

    this.stories = this.state.get('stories');
    this.user = this.state.get('user');

    // if no locale is set, show a message telling the user that it's new,
    // then set a default
    if (!this.state.get('locale')) {
      //alert('Change your language by tapping the settings icon in the top-right corner.');
      this.state.set('locale', 'en-za');
    }

    this.state.on('change:locale', this.localeChanged, this);
    this.loadLocale();
  },

  save: function() {
    if (this.storage) {
      this.storage.setItem('PocketReporter', JSON.stringify(this.state.toJSON()));
    }
  },

  // unique story id for this user
  newStoryId: function() {
    var id = this.state.get('nextId');
    this.state.set('nextId', id + 1);
    return id;
  },

  localeChanged: function() {
    this.loadLocale();
    this.trackEvent('locale', 'changed', this.state.get('locale'));
  },

  loadLocale: function(polyglot, locale) {
    // load new localised phrases
    polyglot = polyglot || this.polyglot;
    locale = locale || this.state.get('locale');
    polyglot.locale(locale);
    polyglot.replace(L10N[locale]);
  },

  general: function() {
    // collapsibles
    $('body').on('show.bs.collapse', '.collapsible-sections .collapse', function() {
      $(this).prev().removeClass('collapsed');
    });
    $('body').on('hide.bs.collapse', '.collapsible-sections .collapse', function() {
      $(this).prev().addClass('collapsed');
    });

    var originalHeight = document.documentElement.clientHeight;
    var originalWidth = document.documentElement.clientWidth;
    $(window).resize(function() {
      // Control landscape/portrait mode switch
      if (document.documentElement.clientHeight == originalWidth &&
        document.documentElement.clientWidth == originalHeight) {
        originalHeight = document.documentElement.clientHeight;
        originalWidth = document.documentElement.clientWidth;
      }
      // Check if the available height is smaller (keyboard is shown) so we hide the footer.
     if (document.documentElement.clientHeight < originalHeight) {
       $('#footer-wrapper').hide();
     } else {
       $('#footer-wrapper').show();
     }
    });

    // cycle any language chooser elements
    setTimeout(_.bind(this.cycleLanguageChooser, this), 3000);
  },

  cycleLanguageChooser: function() {
    $('.change-language-cycler').each(function() {
      var $elem = $(this),
          lang = $elem.data('lang'),
          codes = _.keys(L10N);

      var ix = codes.indexOf(lang);
      ix++;
      if (ix >= codes.length) ix = 0;
      lang = codes[ix];

      $elem
        .text(L10N[lang].splash.language_sel)
        .data('lang', lang);
    });

    setTimeout(_.bind(this.cycleLanguageChooser, this), 3000);
  },

  trackEvent: function(action, category, label, value) {
    if ('gtag' in window) {
      gtagOfflineWrapper.event(
        'event', 
        action, 
        {
          'event_category': category,
          'event_label': label,
          'value': value,
        }
      );
    }
  },


  trackView: function(view) {
    if ('gtag' in window) {
      gtagOfflineWrapper.event(
        'config', 
        'UA-48399585-51', 
        {
          'page_title' : view,
          'page_path': Backbone.history.getFragment(),
        }
      );
    }
  }
});

var router = null;

var app = {
  initialize: function() {
    this.bindEvents();
    // XXX HACK HACK HACK/
    // this means we can run the app using a local webserver
    // and this must be removed when compiling using phonegap
    this.onDeviceReady();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {
    app.eventReceived('deviceready');
  },
  eventReceived: function(id) {
    PocketReporter = new PocketReporter();
    router = new Router();
    Backbone.history.start();
  }
};

app.initialize();


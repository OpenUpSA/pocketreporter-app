/*** AddStoryView ***/
var AddStoryView = Backbone.View.extend({
  className: "add-story-view",
  template: Handlebars.compile($("#add-story-view-template").html()),
  navTab: 'add',

  bindings: {
    '[name=title]': 'title'
  },

  events: {
    'click button.next': 'create'
  },

  initialize: function(options) {
    if (options.category && options.topic) {
      this.model = new Story({}, {parse: true});
      this.model.set('topic', options.topic);

    } else if (options.category) {
      this.model = _.find(PocketReporter.categoriesList.models, function(item) {
        return options.category === item.id;
      })

    } else {
      this.model = PocketReporter.categoriesList;
    }
    
    this.render();

    this.listenTo(this.model, 'change', this.checkOk);
    this.listenTo(PocketReporter.state, 'change:locale', this.render);
  },

  render: function() {
    var props = {
      title: null,
      categoriesList: null,
      category: null,
      story: null,
      baseUrl: '/#add/',
    }

    function getActiveTopics(model) {
      var activeTopicsKeys = model.toJSON().topics;
      var allTopics = PocketReporter.topics.toJSON();

      var activeTopics = activeTopicsKeys.map(function(key) {
        return _.find(allTopics, function(item) {
          return key === item.id;
        })
      })

      activeTopics.forEach(function(item) {
        item.name = PocketReporter.polyglot.t('topics.' + item.id + '.name');
      })

      return activeTopics;
    }

    if (this.model instanceof CategoriesList) {
      props.categoriesList = this.model.toJSON();
      
    } else if (this.model instanceof Category) {
      props.category = getActiveTopics(this.model);
      props.title = this.model.toJSON().name;
      props.baseUrl = '/#add/' + this.model.toJSON().id + '/';

    } else if (this.model instanceof Story) {
      var topics = PocketReporter.topics.toJSON();
      var topic = this.model.get('topic');
      props.story = _.find(topics, function(t) { return t.id == topic; });
    }

    this.$el.html(this.template(props));
    this.stickit();
  
    return this;
  },

  checkOk: function() {
    this.$('button.next').toggleClass('disabled', _.isEmpty(this.model.get('title')));
  },

  create: function(topic) {
    this.model.set('id', PocketReporter.newStoryId());
    PocketReporter.stories.add(this.model);

    router.navigate('stories/' + this.model.id, {trigger: true});
  }
});

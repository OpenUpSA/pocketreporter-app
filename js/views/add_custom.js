/*** AddCustom ***/
var AddCustom = Backbone.View.extend({
  className: "about-view",
  template: Handlebars.compile($("#add-custom-view-template").html()),
  navTab: 'about',

  bindings: {
    '[name=idSlug]': 'idSlug',
  },

  events: {
    'click button.send': 'send'
  },

  initialize: function() {
    this.model = new CustomId({});
    this.listenTo(this.model, 'change:idSlug', this.idSlugUpdate);
    this.render();
  },

  send: function() {
    var self = this;

    if (PocketReporter.topics.get(this.tempSlug)) {
      self.setState('exists')
      return self.render();
    }

    syncLocalStorage(
      [this.tempSlug],
      function(response) {
        if (response === null) {
          self.setState('error');
          return self.render();
        }

        if (response.topics.length <= 0) {
          self.setState('notExist');
          return self.render();
        }

        if (response.topics.length === 1) {
          self.setState('success');
          console.log(response)
          PocketReporter.topics.add(response.topics[0]);
          PocketReporter.categoriesList.get('custom').get('topics').push(response.categories[0].topics[0]);
          return self.render();
        }
      }
    )

    this.setState('loading');
    this.render();
  },

  idSlugUpdate: function(value) {
    this.tempSlug = value.get('idSlug');
  },

  setState: function(state) {
    this.model.clear();
    this.model.set(state, true);
    this.model.set('idSlug', '');
  },

  render: function() {
    this.$el.html(this.template({
      loading: this.model.get('loading'),
      error: this.model.get('error'),
      success: this.model.get('success'),
      exists: this.model.get('exists'),
      notExist: this.model.get('notExist'),
    }));
    this.stickit();

    return this;
  }
});

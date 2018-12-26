/*** Resources General ***/
var ResourcesGeneral = Backbone.View.extend({
  className: "add-story-view",
  template: Handlebars.compile($("#resources-general").html()),
  navTab: 'about',

  initialize: function() {
    this.render();

  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

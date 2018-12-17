/*** Resources ***/
var Resources = Backbone.View.extend({
  className: "add-story-view",
  template: Handlebars.compile($("#resources").html()),
  navTab: 'about',

  initialize: function() {
    this.render();

  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

window.RoundTracker.Views.CoursesIndex = Backbone.View.extend({
  template: JST["courses/index"],
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function () {
    var content = this.template({courses: this.collection});
    this.$el.html(content);

    return this;
  }
});

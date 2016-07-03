window.RoundTracker.Views.CoursesIndex = Backbone.View.extend({
  template: JST["courses/index"],
  events: {
    "click div.myButton": "coursesNew"
  },

  coursesNew: function () {
    Backbone.history.navigate("#courses/new", { trigger: true })
  },

  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function () {
    var content = this.template({courses: this.collection});
    this.$el.html(content);

    return this;
  }
});

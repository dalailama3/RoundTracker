window.RoundTracker.Views.CoursesIndex = Backbone.View.extend({
  template: JST["courses/index"],

  render: function () {
    var content = this.template({courses: this.collection});
    this.$el.html(content);

    return this;
  }
});

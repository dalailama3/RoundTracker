window.RoundTracker.Views.CoursesNew = Backbone.View.extend({
  template: JST["courses/new"],
  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});

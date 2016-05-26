window.RoundTracker.Views.CourseShow = Backbone.View.extend({
  template: JST["courses/show"],
  render: function () {
    var content = this.template({course: this.model});
    this.$el.html(content);

    return this;
  }
});

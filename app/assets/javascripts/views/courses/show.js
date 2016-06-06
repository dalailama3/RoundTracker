window.RoundTracker.Views.CourseShow = Backbone.View.extend({
  template: JST["courses/show"],
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
  },
  render: function () {
    var content = this.template({course: this.model});
    this.$el.html(content);

    return this;
  }
});

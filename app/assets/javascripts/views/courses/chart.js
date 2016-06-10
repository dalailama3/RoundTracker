window.RoundTracker.Views.CourseChart = Backbone.View.extend({
  template: JST["courses/chart"],
  render: function () {
    var content = this.template({course: this.model});
    this.$el.html(content);

    return this;
  }
});

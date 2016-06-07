window.RoundTracker.Views.CourseShow = Backbone.View.extend({
  template: JST["courses/show"],
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
  },
  events: {
      "click button.delete": "deleteCourse"
  },

  deleteCourse: function (e) {
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("#courses", {trigger: true});
      }
    });
  },

  render: function () {
    var content = this.template({course: this.model});
    this.$el.html(content);

    return this;
  }
});

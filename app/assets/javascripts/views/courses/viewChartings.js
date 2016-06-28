window.RoundTracker.Views.ViewChartings = Backbone.View.extend({
  template: JST["courses/viewChart"],
  initialize: function (options) {
    this.course = options.course
  },

  render: function () {
    var current_user = $("div#user").text();

    var content = this.template({user: this.model, course: this.course});
    this.$el.html(content);

    return this;
  }

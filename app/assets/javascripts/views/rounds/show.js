window.RoundTracker.Views.RoundShow = Backbone.View.extend({
  template: JST["rounds/show"],
  initialize: function (options) {
    this.course = options.course,
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    console.log(this.course);
    var content = this.template({round: this.model, course: this.course});
    this.$el.html(content);



    return this;
  }
});

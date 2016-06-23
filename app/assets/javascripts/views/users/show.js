window.RoundTracker.Views.ShowUser = Backbone.View.extend({
  template: JST["user/show"],
  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);

    return this;
  }
});

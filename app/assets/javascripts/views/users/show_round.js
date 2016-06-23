window.RoundTracker.Views.ShowUserRound = Backbone.View.extend({
  template: JST["users/showRound"],
  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);

    return this;
  }
});

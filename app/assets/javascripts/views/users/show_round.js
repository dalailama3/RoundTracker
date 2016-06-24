window.RoundTracker.Views.ShowUserRound = Backbone.View.extend({
  template: JST["users/showUserRound"],
  initialize: function (options) {
    this.round = options.round
    this.listenTo(this.round, "sync", this.render)
  },

  render: function () {
    var content = this.template({user: this.model, round: this.round});
    this.$el.html(content);

    return this;
  }
});

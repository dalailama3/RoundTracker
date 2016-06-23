window.RoundTracker.Views.ShowUser = Backbone.View.extend({
  template: JST["users/show"],
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var rounds = this.model.get("rounds");
    var content = this.template({user: this.model, rounds: rounds});
    this.$el.html(content);

    return this;
  }
});

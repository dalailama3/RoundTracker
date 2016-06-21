window.RoundTracker.Views.SearchUsers = Backbone.View.extend({
  template: JST["users/search"],
  render: function () {
    var content = this.template({users: this.collection});
    this.$el.html(content);

    return this;
  }
});

window.RoundTracker.Views.RoundsIndex = Backbone.View.extend({
  template: JST["rounds/index"],
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render)
  },


  render: function () {
    var content = this.template({rounds: this.collection});
    this.$el.html(content);

    return this;
  }
});
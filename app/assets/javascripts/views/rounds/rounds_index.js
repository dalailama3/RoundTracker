RoundTracker.Views.RoundsIndex = Backbone.View.extend({
  template: JST["rounds/index"],
  initialize: function (options) {
    this.listenTo(this.collection, "sync add", this.render)
  },

  events: {

  },


  render: function () {
    var content = this.template({rounds: this.collection});
    this.$el.html(content);

    return this;
  }
});

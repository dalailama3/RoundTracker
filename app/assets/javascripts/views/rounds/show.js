window.RoundTracker.Views.RoundShow = Backbone.View.extend({
  template: JST["rounds/show"],
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var content = this.template({round: this.model});
    this.$el.html(content);



    return this;
  }
});

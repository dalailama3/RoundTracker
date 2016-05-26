window.RoundTracker.Views.RoundShow = Backbone.View.extend({
  template: JST["rounds/show"],

  render: function () {
    var content = this.template({round: this.model});
    this.$el.html(content);

    return this;
  }
});

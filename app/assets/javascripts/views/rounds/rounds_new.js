window.RoundTracker.Views.RoundsNew = Backbone.View.extend({
  template: JST["rounds/new"],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});

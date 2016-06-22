window.RoundTracker.Views.RoundEdit = Backbone.View.extend({
  template: JST["rounds/edit"],
  render: function () {
    var content = this.template({round: this.model});
    this.$el.html(content);

    return this;
  }
});

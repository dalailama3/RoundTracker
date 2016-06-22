window.RoundTracker.Views.RoundShow = Backbone.View.extend({
  template: JST["rounds/show"],
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
  },
  events: {
  },

  deleteRound: function () {
    this.model.destroy({success: function (model, response) {
      self.collection.remove(self);
    }});
  },

  render: function () {
    var content = this.template({ round: this.model });
    this.$el.html(content);

    return this;
  }
});

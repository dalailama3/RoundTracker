window.RoundTracker.Views.RoundShow = Backbone.View.extend({
  template: JST["rounds/show"],
  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render)
  },

  events: {
    "click button#delete": "deleteRound"
  },

  deleteRound: function (e) {
    e.preventDefault();
    $( '#myModal' ).remove();
    $( '.modal-backdrop' ).remove();
    $( 'body' ).removeClass( "modal-open" );

    var self = this;
    this.model.destroy({success: function (model, response) {
      self.collection.remove(model);
      Backbone.history.navigate("#", {trigger: true});

    }});
  },

  render: function () {
    var content = this.template({ round: this.model });
    this.$el.html(content);

    return this;
  }
});

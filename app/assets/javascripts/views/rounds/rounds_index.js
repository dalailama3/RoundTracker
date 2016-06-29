window.RoundTracker.Views.RoundsIndex = Backbone.View.extend({
  template: JST["rounds/index"],
  initialize: function (options) {
    this.listenTo(this.collection, "sync remove", this.render)
  },


  render: function () {

    var current_user_email = $("div#user-email").text();
    var content = this.template({rounds: this.collection, current_user_email: current_user_email});
    this.$el.html(content);

    return this;
  }
});

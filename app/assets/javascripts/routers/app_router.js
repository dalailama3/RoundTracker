window.RoundTracker.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "roundsIndexPage",
    "rounds/:id": "roundShowPage"
  },

  currentView: null,

  roundsIndexPage: function () {

    var rounds = RoundTracker.Collections.rounds;
    var indexView = new RoundTracker.Views.RoundsIndex({collection: rounds});

    rounds.fetch();

    this._swapView(indexView);
  },

  roundShowPage: function () {

  },

  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    $("div.backdrop").html(view.render().$el);
  }
});

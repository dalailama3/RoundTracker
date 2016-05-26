window.RoundTracker.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "roundsIndexPage",
    "rounds/:id": "roundShowPage",
    "courses": "coursesIndexPage"
  },

  currentView: null,

  roundsIndexPage: function () {

    var rounds = RoundTracker.Collections.rounds;
    var indexView = new RoundTracker.Views.RoundsIndex({collection: rounds});

    rounds.fetch();

    this._swapView(indexView);
  },

  roundShowPage: function (id) {
    var round = RoundTracker.Collections.rounds.getOrFetch(id);
    var showView = new RoundTracker.Views.RoundShow({model: round});

    this._swapView(showView);
  },

  coursesIndexPage: function () {

    var courses = RoundTracker.Collection.courses;

    var indexView = new RoundTracker.Views.CoursesIndex({collection: courses});

    courses.fetch();

    this._swapView(indexView);
  },

  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    $("div.backdrop").html(view.render().$el);
  }
});

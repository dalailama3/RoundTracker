window.RoundTracker.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "roundsIndexPage",
    "rounds/:id": "roundShowPage",
    "courses": "coursesIndexPage",
    "courses/:id": "courseShowPage"
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

    // this._swapView(showView);
    $("div.right").html(showView.render().$el);
  },

  coursesIndexPage: function () {

    var courses = RoundTracker.Collections.courses;

    var indexView = new RoundTracker.Views.CoursesIndex({collection: courses});

    courses.fetch();

    this._swapView(indexView);
  },

  courseShowPage: function (id) {
    var course = RoundTracker.Collections.courses.getOrFetch(id);
    var showView = new RoundTracker.Views.CourseShow({model: course});

    this._swapView(showView);

  },

  _swapView: function (view) {
      $("div.right").empty();
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    $("div.backdrop").html(view.render().$el);

  }
});

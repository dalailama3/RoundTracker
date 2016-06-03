window.RoundTracker.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "roundsIndexPage",
    "rounds/new": "roundsNewPage",
    "rounds/:id": "roundShowPage",
    "courses": "coursesIndexPage",
    "courses/new": "coursesNewPage",
    "courses/:id": "courseShowPage",

  },

  currentView: null,

  roundsIndexPage: function () {

    var rounds = RoundTracker.Collections.rounds;
    rounds.fetch();
    var indexView = new RoundTracker.Views.RoundsIndex({collection: rounds});



    this._swapView(indexView);
  },

  roundShowPage: function (id) {
    var round = RoundTracker.Collections.rounds.getOrFetch(id);

    var showView = new RoundTracker.Views.RoundShow({model: round});

    // this._swapView(showView);
    $("div.right").html(showView.render().$el);
  },

  roundsNewPage: function () {
    var courses = RoundTracker.Collections.courses;

    courses.fetch();

    var roundsNew = new RoundTracker.Views.RoundsNew({courses: courses});
    this._swapView(roundsNew)

  },

  coursesIndexPage: function () {

    var courses = RoundTracker.Collections.courses;
    courses.fetch();

    var indexView = new RoundTracker.Views.CoursesIndex({collection: courses});



    this._swapView(indexView);
  },

  courseShowPage: function (id) {
    var course = RoundTracker.Collections.courses.getOrFetch(id);
    var showView = new RoundTracker.Views.CourseShow({model: course});

    this._swapView(showView);

  },

  coursesNewPage: function () {
    var coursesNew = new RoundTracker.Views.CoursesNew();
    // this._swapView(coursesNew);
    $("div.right").html(coursesNew.render().$el);

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

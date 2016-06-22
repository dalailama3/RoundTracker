window.RoundTracker.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "roundsIndexPage",
    "rounds/new": "roundsNewPage",
    "rounds/:id": "roundShowPage",
    "rounds/:id/edit": "editRoundPage",
    "courses": "coursesIndexPage",
    "courses/new": "coursesNewPage",
    "courses/:id": "courseShowPage",
    "courses/:id/chart":"chartCoursePage",
    "users": "usersSearchPage"

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
    var rounds = RoundTracker.Collections.rounds;

    var showView = new RoundTracker.Views.RoundShow({model: round, collection: rounds});

    // this._swapView(showView);
    $("div.right").html(showView.render().$el);
  },

  editRoundPage: function (id) {
    var round = RoundTracker.Collections.rounds.getOrFetch(id);

    var editView = new RoundTracker.Views.RoundEdit({model: round});

    this._swapView(editView);
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
    this._swapView(coursesNew);
    // $("div.right").html(coursesNew.render().$el);

  },

  chartCoursePage: function (id) {
    var course = RoundTracker.Collections.courses.getOrFetch(id);
    var chartCourse = new RoundTracker.Views.CourseChart({model: course});

    this._swapView(chartCourse);
  },

  usersSearchPage: function () {
    var users = RoundTracker.Collections.users;

    users.fetch();

    var searchUsers = new RoundTracker.Views.SearchUsers({collection: users});

    this._swapView(searchUsers);
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

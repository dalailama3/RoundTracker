window.RoundTracker.Collections.Courses = Backbone.Collection.extend({
  url: "api/courses",

  getOrFetch: function (id) {
    var courses = this;
    var course;
    if (course = courses.get(id)) {
      course.fetch();
    } else {
      course = new RoundTracker.Models.Round({id: id});
      course.fetch({
        success: function () {
          courses.add(course);

        }
      })
    }
    return course;

  }
});

window.RoundTracker.Collections.courses = new RoundTracker.Collections.Courses();

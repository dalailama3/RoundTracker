window.RoundTracker.Models.Round = Backbone.Model.extend({
  urlRoot: "api/rounds",

  totalScore: function () {
    var self = this;
    var total = 0;
    var hash = self.get("score_hash");
    for (var hole in hash) {
      total += parseInt(hash[hole]);
    }
    return total;
  },

  course: function () {
    var self = this;
    var courseId = self.get("course_id");
    var courses = RoundTracker.Collections.courses;
    courses.fetch();
    var course = courses.get(courseId);

    return course;
  }
});

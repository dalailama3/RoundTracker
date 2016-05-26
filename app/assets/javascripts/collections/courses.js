window.RoundTracker.Collections.Courses = Backbone.Collection.extend({
  url: "api/courses"
});

window.RoundTracker.Collections.courses = new RoundTracker.Collections.Courses();

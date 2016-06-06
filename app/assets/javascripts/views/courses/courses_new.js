window.RoundTracker.Views.CoursesNew = Backbone.View.extend({
  template: JST["courses/new"],
  events: {
    "click submit": "addCourse"
  },

  addCourse: function (e) {
    e.preventDefault();
    var courseData = $("form").seralizeJSON()["course"];
    var newCourse = new RoundTracker.Models.Course();

    newCourse.save(courseData, {
      success: function () {
        Backbone.history.navigate("#courses", {trigger: true});
      },
      error: function (model, response) {
        $("html, body").animate({
           scrollTop: 0
       }, 200);
        var errorsUl = $("ul.errors");
        errorsUl.empty();
        var errors = response.responseJSON;

        _.each(errors, function (error) {

          var li = $("<li>").text(error);
          errorsUl.append(li);

        });
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});

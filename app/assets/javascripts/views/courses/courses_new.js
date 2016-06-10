window.RoundTracker.Views.CoursesNew = Backbone.View.extend({
  template: JST["courses/new"],
  events: {
    "submit form": "addCourse"
  },

  addCourse: function (e) {

    e.preventDefault();
    var courseData = $("form").serializeJSON()["course"];
    var newCourse = new RoundTracker.Models.Course();

    newCourse.save(courseData, {
      success: function (model, response) {

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
      }
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});

window.RoundTracker.Views.CoursesNew = Backbone.View.extend({
  template: JST["courses/new"],
  events: {
    "click div.myButton": "addCourse"
  },

  addCourse: function (e) {

    e.preventDefault();

    var newCourse = new RoundTracker.Models.Course();
    var courseName = $("#course_name").val();

    var pars = {};
    var tds = $("tr.pars").find("td.par");

    _.each(tds, function (td) {
      var key = $(td).attr("name");

      var val = $(td).text();
      pars[key] = val;
    });

    newCourse.set({name: courseName, par_hash: pars});

    newCourse.save({}, {
      success: function (model, response) {

        Backbone.history.navigate("#courses", {trigger: true});
      },
      error: function (model, response) {
        $("html, body").animate({
           scrollTop: 0
       }, 200);
        $("div#errors").removeClass("hidden");
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

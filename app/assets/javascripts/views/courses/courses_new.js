window.RoundTracker.Views.CoursesNew = Backbone.View.extend({
  template: JST["courses/new"],
  events: {
    "submit form": "addCourse",
    "change #imgInp": "previewImg",
    "click #myCanvas": "saveImg"
  },

  imageHash: {},

  saveImg: function (e) {
    var dataURL = canvas.toDataURL();

    var course = RoundTracker.Collections.courses.getOrFetch(15);

    course.set({"image": dataURL});
    console.log(dataURL);
    console.log(course);
    course.save({}, {
      success: function (model, response) {
        console.log(model);
        Backbone.history.navigate("#courses", {trigger: true});
      }
    });

  },


  previewImg: function (e) {
    var input = e.currentTarget;
    var key = $(input).data("key");
    var self = this;

    if (input.files && input.files[0]) {
           var reader = new FileReader();

           reader.onload = function (e) {
               $('#blah').attr('src', e.target.result);

               self.imageHash[key] = e.target.result;
           }

         reader.readAsDataURL(input.files[0]);
    }
  },

  addCourse: function (e) {

    e.preventDefault();
    var courseData = $("form").serializeJSON()["course"];
    var imageData = this.imageHash;
    console.log(imageData);

    var newCourse = new RoundTracker.Models.Course({
      images_hash: imageData
    });

    console.log(newCourse);

    newCourse.save(courseData, {
      success: function (model, response) {
        console.log(model);
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

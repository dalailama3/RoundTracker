window.RoundTracker.Views.CoursesNew = Backbone.View.extend({
  template: JST["courses/new"],
  events: {
    "submit form": "addCourse",
    "change #imgInp": "previewImg"
  },

  imageHash: {},

  previewImg: function (e) {
    var input = e.currentTarget;
    var key = $(input).data("key");
    this.imageHash[key] = input.files[0];

    if (input.files && input.files[0]) {
           var reader = new FileReader();

           reader.onload = function (e) {
               $('#blah').attr('src', e.target.result);
           }

         reader.readAsDataURL(input.files[0]);
    }
  },

  addCourse: function (e) {

    e.preventDefault();
    var courseData = $("form").serializeJSON()["course"];
    var imageData = this.imageHash;

    var newCourse = new RoundTracker.Models.Course({
      images_hash: imageData
    });

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

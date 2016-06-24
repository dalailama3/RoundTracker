window.RoundTracker.Views.CourseShow = Backbone.View.extend({
  template: JST["courses/show"],
  initialize: function (options) {
    this.listenTo(this.model, "sync change", this.render)
  },
  events: {
    "click button.delete": "deleteCourse",
    "blur td.par": "editParHash"
  },

  deleteCourse: function (e) {
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("#courses", {trigger: true});
      }
    });
  },

  editParHash: function (e) {
    var self = this;
    var target = e.currentTarget;
    var parHash = this.model.get("par_hash");

    var newVal = $(target).text();
    var holeNum = $(target).data("hole");

    parHash[holeNum] = newVal;

    var course = this.model;
    course.set("par_hash", parHash);
    course.save({});
  },


  render: function () {
    var current_user = $("div#user").html();

    var content = this.template({course: this.model, current_user_id: current_user});
    this.$el.html(content);

    return this;
  }
});

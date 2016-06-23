window.RoundTracker.Views.RoundsNew = Backbone.View.extend({
  template: JST["rounds/new"],
  initialize: function (options) {
    this.courses = options.courses,
    this.listenTo(this.courses, "sync", this.render)
  },
  events: {
    "submit form": "createRound",


  },

  createRound: function (e) {
    var view = this;
    e.preventDefault();

    var roundData = $("form").serializeJSON()["round"];


    var round = new RoundTracker.Models.Round();
    round.save(roundData, {
      success: function () {
        Backbone.history.navigate("#", {trigger: true});
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
    var content = this.template({courses: this.courses});
    this.$el.html(content);

    return this;
  }
});

window.RoundTracker.Views.RoundsNew = Backbone.View.extend({
  template: JST["rounds/new"],
  initialize: function (options) {
    this.courses = options.courses,
    this.listenTo(this.courses, "sync", this.render)
  },
  events: {
    "submit form": "createRound",
    "click input:checkbox": "beLikeRadio"

  },

  beLikeRadio: function (e) {
    var clicked = e.currentTarget;
    var id = clicked.id
    var other = id === "yes" ? "no" : "yes"
    var parent = $(clicked).parents("tr")
    var sib = parent.find("input#" + other);
    sib.prop("checked", false);
  },

  createRound: function () {
    event.preventDefault();

    var roundData = $("form").serializeJSON()["round"];


    var round = new RoundTracker.Models.Round();
    round.save(roundData, {
      success: function () {
        console.log("it's a bingo!");
        Backbone.history.navigate("#", {trigger: true});
      }
    });

  },

  render: function () {
    var content = this.template({courses: this.courses});
    this.$el.html(content);

    return this;
  }
});

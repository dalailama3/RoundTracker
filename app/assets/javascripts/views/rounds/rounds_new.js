window.RoundTracker.Views.RoundsNew = Backbone.View.extend({
  template: JST["rounds/new"],
  initialize: function (options) {
    this.courses = options.courses,
    this.listenTo(this.courses, "sync", this.render)
  },
  events: {
    "click button#create-round": "createRound",
    "click td#green": "toggleBullseye",
    "click td#fairway": "toggleCheckmark"
  },

  getScores: function () {
    scores = {};
    var tds = $("tr.scores").find("td.score");
    _.each(tds, function (td) {
      var key = $(td).attr("name");
      var val = $(td).text();
      scores[key] = val;
    });
    return scores;
  },

  getPutts: function () {
    putts = {};
    var tds = $("tr.putts").find("td.putts");
    _.each(tds, function (td) {
      var key = $(td).attr("name");
      var val = $(td).text();
      putts[key] = val;
    });
    return putts;

  },

  getFairways: function () {
    fairways = {};
    var tds = $("tr.fairways").find("td.checkable");
    _.each(tds, function (td) {
      var key = $(td).attr("name");
      $(td).hasClass("checkmark") ? fairways[key] = "Y": fairways[key] = "N";
    });
    return fairways;

  },

  getGreens: function () {
    greens = {};
    var tds = $("tr.greens").find("td.checkable");
    _.each(tds, function (td) {
      var key = $(td).attr("name");
      $(td).hasClass("bullseye") ? greens[key] = "Y": greens[key] = "N";
    });
    return greens;
  },

  toggleBullseye: function (e) {
    var self = this;
    var clicked = e.currentTarget;
    var $clicked = $(clicked);
    $clicked.toggleClass("bullseye");
  },


  toggleCheckmark: function (e) {
    var self = this;
    var clicked = e.currentTarget;
    var $clicked = $(clicked);
    $clicked.toggleClass("checkmark");
  },

  createRound: function (e) {
    var view = this;
    e.preventDefault();

    var inputData = $("form").serializeJSON()["round"];

    var round = new RoundTracker.Models.Round();

    var greens = this.getGreens();
    var fairways = this.getFairways();
    var scores = this.getScores();
    var putts = this.getPutts();

    round.set({"greens_hash": greens, "fairways_hash": fairways, "score_hash": scores, "putts_hash": putts});


    round.save(inputData, {
      success: function () {
        Backbone.history.navigate("#rounds", {trigger: true});
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
    var content = this.template({courses: this.courses});
    this.$el.html(content);

    return this;
  }
});

window.RoundTracker.Views.RoundEdit = Backbone.View.extend({
  template: JST["rounds/edit"],
  initialize: function (options) {
      this.courses = options.courses
      this.listenTo(this.courses, "sync", this.render)
  },

  events: {
    "click td.checkable": "toggleValue",
    "click button.edit": "editRound"
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
      var val = $(td).text();
      fairways[key] = val;
    });
    return fairways;

  },

  getGreens: function () {
    greens = {};
    var tds = $("tr.greens").find("td.checkable");
    _.each(tds, function (td) {
      var key = $(td).attr("name");
      var val = $(td).text();
      greens[key] = val;
    });
    return greens;
  },

  toggleValue: function (e) {
    var self = this;
    var clicked = e.currentTarget;
    var val = $(clicked).text();

    if (val === '✓') {
      $(clicked).text('');
    } else {
      $(clicked).text('✓');
    }
  },

  editRound: function (e) {
    var self = this;
    var round = this.model;
    var inputData = $("form.edit-round").serializeJSON()["round"];
    var greens = this.getGreens();
    var fairways = this.getFairways();
    var putts = this.getPutts();
    var scores = this.getScores();

    round.set({greens_hash: greens, fairways_hash: fairways, putts_hash: putts, score_hash: scores});

    round.save(inputData, {
      success: function () {
        Backbone.history.navigate("#rounds/" + round.id, {trigger: true});
      }
    });
  },

  render: function () {
    var content = this.template({round: this.model, courses: this.courses});
    this.$el.html(content);

    return this;
  }
});

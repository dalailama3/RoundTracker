window.RoundTracker.Views.RoundEdit = Backbone.View.extend({
  template: JST["rounds/edit"],
  initialize: function (options) {
      this.courses = options.courses
      this.listenTo(this.courses, "sync", this.render)
  },

  greens: null,
  fairways: null,
  scores: null,
  putts: null,

  events: {
    "click td.checkable": "toggleValue",
    "blur td.score": "newScoreHash",
    "blur td.putts": "newPuttsHash",
    "click button.edit": "editRound"
  },

  newScoreHash: function (e) {
    var scoreHash = this.model.get("score_hash");
    var target = e.currentTarget;
    var hole = $(target).data("hole");
    var newVal = $(target).text();
    scoreHash[hole] = $(target).text();
    this.scores = scoreHash;
  },

  newPuttsHash: function (e) {
    var puttsHash = this.model.get("putts_hash");
    var target = e.currentTarget;
    var hole = $(target).data("hole");
    var newVal = $(target).text();
    puttsHash[hole] = $(target).text();
    this.putts = puttsHash;
  },

  toggleValue: function (e) {
    var self = this;
    var clicked = e.currentTarget;
    var val = $(clicked).text();

    if (val === '✓') {
      $(clicked).text('');
      self.updateFairwaysOrGreens(clicked, "N");
      } else {
      $(clicked).text('✓');
      self.updateFairwaysOrGreens(clicked, "Y");
    }
  },

  updateFairwaysOrGreens: function (context, val) {
    if ($(context).data("green")) {
      var greens = this.model.get("greens_hash");
      var hole = $(context).data("green");
      greens[hole] = val
      this.greens = greens;
    } else {
      var fairways = this.model.get("fairways_hash");
      var hole = $(context).data("fairway");
      fairways[hole] = val;
      this.fairways = fairways;
    }
  },

  editRound: function (e) {
    var round = this.model;
    var inputData = $("form.edit-round").serializeJSON()["round"];
    console.log(inputData);
  },

  render: function () {
    var content = this.template({round: this.model, courses: this.courses});
    this.$el.html(content);

    return this;
  }
});

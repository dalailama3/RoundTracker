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
    var greens = this.greens || round.get("greens_hash");
    var fairways = this.fairways || round.get("fairways_hash");
    var putts = this.putts || round.get("putts_hash");
    var scores = this.scores || round.get("score_hash");

    round.set({greens_hash: greens, fairways_hash: fairways, putts_hash: putts, score_hash: scores});

    round.save({inputData}, {
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

window.RoundTracker.Views.RoundEdit = Backbone.View.extend({
  template: JST["rounds/edit"],
  initialize: function (options) {
      this.courses = options.courses
      this.listenTo(this.courses, "sync", this.render)
  },

  events: {
    "click td.checkable": "toggleValue",
    "blur td.score": "newScoreHash",
    "blur td.putts": "newPuttsHash"
  },

  newScoreHash: function (e) {
    var scoreHash = this.model.get("score_hash");
    var target = e.currentTarget;
    var hole = $(target).data("hole");
    var newVal = $(target).text();
    scoreHash[hole] = $(target).text();
  },

  newPuttsHash: function (e) {
    var puttsHash = this.model.get("putts_hash");
    var target = e.currentTarget;
    var hole = $(target).data("hole");
    var newVal = $(target).text();
    puttsHash[hole] = $(target).text();
  },

  toggleValue: function (e) {
    var clicked = e.currentTarget;
    var val = $(clicked).text();

    if (val === '✓') {
      $(clicked).text('');
    } else {
      $(clicked).text('✓');
    }
  },

  render: function () {
    var content = this.template({round: this.model, courses: this.courses});
    this.$el.html(content);

    return this;
  }
});

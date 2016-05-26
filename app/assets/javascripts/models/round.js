window.RoundTracker.Models.Round = Backbone.Model.extend({
  urlRoot: "api/rounds",

  totalScore: function () {
    var self = this;
    var total = 0;
    var hash = self.get("score_hash");
    for (var hole in hash) {
      total += parseInt(hash[hole]);
    }
    return total;
  }
});

window.RoundTracker.Models.Round = Backbone.Model.extend({
  urlRoot: "api/rounds",
  fairwaysCount: function () {
    var self = this;
    var hash = self.get("fairways_hash");
    var count = 0;
    for (var key in hash) {
      if (hash[key] === "Y") {
        count += 1;
      }
    }
    return count;
  }
});

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
  },

  totalPutts: function () {
    var self = this;
    var puttsTotal = 0;
    var puttsHash = self.get("putts_hash");
    for (var key in puttsHash) {
      puttsTotal += isNaN(parseInt(puttsHash[key])) ? 0 : parseInt(puttsHash[key]);
    }

  }
});

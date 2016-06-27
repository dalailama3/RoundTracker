window.RoundTracker.Models.Round = Backbone.Model.extend({
  urlRoot: "api/rounds",

  everyValIsBlank: function(obj) {
    for (var key in obj) {
      if (obj[key] !== "") {
        return false;
      }
    }
    return true;
  },

  noHash: function (hashType) {
    var self = this;
    var hash = self.get(hashType);

    return this.everyValIsBlank(hash) || (hash === null) || (_.isEmpty(hash));

  },

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
    return puttsTotal;
  },

  greensCount: function () {
    var self = this;
    var hash = self.get("greens_hash");
    var count = 0;
    for (var key in hash) {
      if (hash[key] === "Y") {
        count += 1;
      }
    }
    return count;
  }
});

window.RoundTracker.Models.Course = Backbone.Model.extend({
  urlRoot: "api/courses",

  noHash: function (hashType) {
    var self = this;
    var hash = self.get(hashType);

    return this.everyValIsBlank(hash) || (hash === null) || (_.isEmpty(hash));

  },

  everyValIsBlank: function(obj) {
    for (var key in obj) {
      if (obj[key] !== "") {
        return false;
      }
    }
    return true;
  }


});

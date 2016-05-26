window.RoundTracker.Collections.Rounds = Backbone.Collection.extend({
  urlRoot: "api/rounds",
  model: RoundTracker.Models.Round
});

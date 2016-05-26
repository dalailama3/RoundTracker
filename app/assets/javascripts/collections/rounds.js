window.RoundTracker.Collections.Rounds = Backbone.Collection.extend({
  url: "api/rounds",
  model: RoundTracker.Models.Round
});
window.RoundTracker.Collections.rounds = new RoundTracker.Collections.Rounds()

window.RoundTracker.Collections.Rounds = Backbone.Collection.extend({
  url: "api/rounds",
  model: RoundTracker.Models.Round,

  getOrFetch: function (id) {
    var rounds = this;
    var round;
    if (round = rounds.get(id)) {
      round.fetch();
    } else {
      round = new RoundTracker.Models.Round({id: id});
      round.fetch({
        success: function () {
          rounds.add(round);

        }
      })
    }
    return round;

  }
});
window.RoundTracker.Collections.rounds = new RoundTracker.Collections.Rounds()

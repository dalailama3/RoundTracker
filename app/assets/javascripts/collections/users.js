window.RoundTracker.Collections.Users = Backbone.Collection.extend({
  url: "api/users"
});

window.RoundTracker.Collections.rounds = new RoundTracker.Collections.Users();

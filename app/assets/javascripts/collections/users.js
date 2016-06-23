window.RoundTracker.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  model: RoundTracker.Models.User
});

window.RoundTracker.Collections.users = new RoundTracker.Collections.Users();

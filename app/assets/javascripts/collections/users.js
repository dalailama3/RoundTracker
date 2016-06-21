window.RoundTracker.Collections.Users = Backbone.Collection.extend({
  url: "api/users"
});

window.RoundTracker.Collections.users = new RoundTracker.Collections.Users();

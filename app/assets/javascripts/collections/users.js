window.RoundTracker.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  model: RoundTracker.Models.User,

  getOrFetch: function (id) {
    var users = this;
    var user;
    if (user = users.get(id)) {
      user.fetch();
    } else {
      user = new RoundTracker.Models.User({id: id});
      user.fetch({
        success: function () {
          console.log("hey");
        }
      });
    }
    return user;

  }
});

window.RoundTracker.Collections.users = new RoundTracker.Collections.Users();

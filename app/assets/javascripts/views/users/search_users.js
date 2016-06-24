window.RoundTracker.Views.SearchUsers = Backbone.View.extend({
  template: JST["users/search"],
  events: {
    "keyup #search_users": "startSearch"
  },
  render: function () {
    var content = this.template({users: this.collection});
    this.$el.html(content);

    return this;
  },

  startSearch: function (e) {
    e.preventDefault();
    var val = $("#search_users").val();
    val = val.toLowerCase();
    var current_user_email = $("div#user-email").text();


    var models = this.collection.models;

    var arr = [];
    _.each(models, function (model) {
      arr.push(model.get("email"));
    });

    var result = [];
    _.each(models, function (model) {
      var email = model.get("email");
      if (email !== current_user_email && email.startsWith(val)) {
        var userUrl = "#users/" + model.id;
        result.push('<li><a href=' + userUrl + '>' + email + '</a>' + '</li>');
      }
    });

    if (val.length > 0) {
      $("ul.users").html(result.join(''));
    } else {
      $("ul.users").empty();
    }

  }
});

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

    var models = this.collection.models;
    var arr = [];
    _.each(models, function (model) {
      arr.push(model.attributes.email);
    });

    var result = [];
    _.each(arr, function (str) {
      if (str.startsWith(val)) {
        result.push('<li>' + str + '</li>');
      }
    });

    if (val.length > 0) {
      $("ul.users").html(result.join(''));
    } else {
      $("ul.users").empty();
    }

  }
});

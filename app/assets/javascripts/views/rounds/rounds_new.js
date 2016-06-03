window.RoundTracker.Views.RoundsNew = Backbone.View.extend({
  template: JST["rounds/new"],
  initialize: function (options) {
    this.courses = options.courses,
    this.listenTo(this.courses, "sync", this.render)
  },
  events: {
    "submit form": "createRound"

  },

  createRound: function () {
    event.preventDefault();

    var stuff = $("form").serializeJSON();
    console.log(stuff);
  },

  render: function () {
    var content = this.template({courses: this.courses});
    this.$el.html(content);

    return this;
  }
});

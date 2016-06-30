window.RoundTracker.Views.ViewChartings = Backbone.View.extend({
  template: JST["courses/viewChart"],
  initialize: function (options) {
    this.course = options.course
    this.listenTo(this.course, "sync", this.render)
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "click li.img": "beginViewing"
  },

  beginViewing: function (e) {
    var selectedImg = $(e.currentTarget).find("img")[0];
    var canvas = document.getElementById("viewingCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(selectedImg, 0, 0);
  },

  render: function () {
    var current_user = $("div#user").text();

    var content = this.template({user: this.model, course: this.course});
    this.$el.html(content);

    return this;
  }
});

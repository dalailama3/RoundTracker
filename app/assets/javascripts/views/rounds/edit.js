window.RoundTracker.Views.RoundEdit = Backbone.View.extend({
  template: JST["rounds/edit"],
  initialize: function (options) {
      this.courses = options.courses
      this.listenTo(this.courses, "sync", this.render)
  },

  events: {
    "click td.checkable": "toggleValue"
  },

  toggleValue: function (e) {
    var clicked = e.currentTarget;
    var val = $(clicked).text();

    if (val === '✓') {
      $(clicked).text('');
    } else {
      $(clicked).text('✓');
    }
  },

  render: function () {
    var content = this.template({round: this.model, courses: this.courses});
    console.log(this.courses);
    this.$el.html(content);

    return this;
  }
});

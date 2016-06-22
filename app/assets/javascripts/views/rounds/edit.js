window.RoundTracker.Views.RoundEdit = Backbone.View.extend({
  template: JST["rounds/edit"],
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
    var content = this.template({round: this.model});
    this.$el.html(content);

    return this;
  }
});

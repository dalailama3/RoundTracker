window.RoundTracker = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new window.RoundTracker.Routers.AppRouter()
    Backbone.history.start()
  }
};

$(document).ready(function(){
  RoundTracker.initialize();
});

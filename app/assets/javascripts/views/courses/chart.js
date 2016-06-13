window.RoundTracker.Views.CourseChart = Backbone.View.extend({
  template: JST["courses/chart"],


  events: {
    "mousedown canvas": "doSomething",
    "mousemove canvas": "doMoreStuff",
    "mouseup canvas": "stopPainting",
    "click button.clear": "clearCanvas"
  },

  paint: false,
  clickX: [],
  clickY: [],
  clickDrag: [],

  clearCanvas: function (e) {
    var canvas = document.getElementById('canvasInAPerfectWorld');
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
  },

  stopPainting: function (e) {
    this.paint = false;
  },

  addClick: function (x, y, dragging) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  },

  doSomething: function (e) {
    var mouseX = e.pageX - e.currentTarget.offsetLeft;
    var mouseY = e.pageY - e.currentTarget.offsetTop;

    this.paint = true;
    this.addClick(mouseX, mouseY, this.paint);
    this.redraw();
  },

  doMoreStuff: function (e) {
    if (this.paint) {
      this.addClick(e.pageX - e.currentTarget.offsetLeft, e.pageY - e.currentTarget.offsetTop, true);
      this.redraw();
    }

  },

  redraw: function () {
    var canvas = document.getElementById('canvasInAPerfectWorld');

    var context = canvas.getContext("2d");
    var self = this;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for (var i=0; i < self.clickX.length; i++) {
      context.beginPath();
      if (self.clickDrag[i] && i) {
        context.moveTo(self.clickX[i-1], self.clickY[i-1]);
      } else{
        context.moveTo(self.clickX[i]-1, self.clickY[i]);
      }
      context.lineTo(self.clickX[i], self.clickY[i]);
      context.closePath();
      context.stroke();
    }
  },

  render: function () {
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    var content = this.template({course: this.model});
    this.$el.html(content);

    return this;
  }
});

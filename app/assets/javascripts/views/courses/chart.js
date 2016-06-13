window.RoundTracker.Views.CourseChart = Backbone.View.extend({
  template: JST["courses/chart"],


  events: {
    "mousedown canvas": "startPainting",
    "mousemove canvas": "keepPainting",
    "mouseup canvas": "stopPainting",
    "click button.clear": "clearCanvas",
    "click button.color": "changeColor",
    "click button.size": "changeSize",
    "click button.eraser": "startErasing",
    "click button.marker": "useMarker"
  },

  paint: false,
  clickX: [],
  clickY: [],
  clickDrag: [],

  colorPurple: "#cb3594",
  colorGreen: "#659b41",
  colorYellow: "#ffcf33",
  colorBrown: "#986928",
  curColor: "#659b41",
  clickColor: [],

  clickSize: [],
  curSize: 5,

  curTool: "marker",

  changeSize: function (e) {
    var self = this;
    var size = $(e.currentTarget).text();
    switch (size) {
      case "Thin":
        self.curSize = 2.5;
        break;
      case "Normal":
        self.curSize = 5;
        break;
      case "Thick":
        self.curSize = 7.5;
        break;
      case "Broad":
        self.curSize = 10;
        break;
    }
  },

  changeColor: function (e) {
    var color = $(e.currentTarget).text();
    var func = 'this.color' + color;

    this.curColor = eval(func);
  },

  clearCanvas: function (e) {
    var canvas = document.getElementById('canvasInAPerfectWorld');
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.clickColor = [];
    this.clickSize = [];
  },

  stopPainting: function (e) {
    this.paint = false;
  },

  addClick: function (x, y, dragging) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);

    if (this.curTool === "eraser") {
      this.clickColor.push("white");
    } else {
      this.clickColor.push(this.curColor);
      this.clickSize.push(this.curSize);
    }
  },

  startErasing: function (e) {
    this.curTool = "eraser";
  },

  useMarker: function (e) {
    this.curTool = "marker";
  },

  startPainting: function (e) {
    var mouseX = e.pageX - e.currentTarget.offsetLeft;
    var mouseY = e.pageY - e.currentTarget.offsetTop;

    this.paint = true;
    this.addClick(mouseX, mouseY);
    this.redraw();
  },

  keepPainting: function (e) {
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
    context.lineJoin = "round";

    for (var i=0; i < self.clickX.length; i++) {
      context.beginPath();
      if (self.clickDrag[i] && i) {
        context.moveTo(self.clickX[i-1], self.clickY[i-1]);
      } else{
        context.moveTo(self.clickX[i]-1, self.clickY[i]);
      }
      context.lineTo(self.clickX[i], self.clickY[i]);
      context.closePath();
      context.strokeStyle = self.clickColor[i];
      context.lineWidth = self.clickSize[i];
      context.stroke();
    }
  },

  render: function () {
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.clickColor = [];
    this.clickSize = [];
    var content = this.template({course: this.model});
    this.$el.html(content);

    return this;
  }
});

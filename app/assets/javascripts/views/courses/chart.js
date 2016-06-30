window.RoundTracker.Views.CourseChart = Backbone.View.extend({
  template: JST["courses/chart"],
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)

  },

  events: {
    "mousedown canvas": "startPainting",
    "mousemove canvas": "keepPainting",
    "mouseleave canvas": "stopPainting",
    "mouseup canvas": "stopPainting",
    "click button.clear": "clearCanvas",
    "click button.color": "changeColor",
    "click button.size": "changeSize",
    "click button.eraser": "startErasing",
    "click button.marker": "useMarker",
    "click button.save": "saveImg",
    "click li.img": "editImg"
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

  editImg: function (e) {
    var self = this;
    var course = this.model;
    var selectedImg = $(e.currentTarget).find("img")[0];
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(selectedImg, 0, 0);

    var key = $(selectedImg).data("key");
    var images_hash = this.model.get("images_hash");

    var editButton = $("<button>", {
      "class": "edit btn btn-default",
      "text": "Edit"
    }).on("click", function () {
      images_hash[key] = document.getElementById("myCanvas").toDataURL();
      var new_images = images_hash;


      course.set("images_hash", new_images);

      course.save({}, {
        success: function (model, response) {
          self.render();
        }
      })
    });

    $("div.edit").html(editButton);

  },

  saveImg: function (e) {
    var self = this;
    var canvas = document.getElementById("myCanvas");
    var imgData = canvas.toDataURL();

    var course = this.model;
    course.set("image", imgData);
    course.save({}, {
      success: function () {
        self.render();
      }
    });
  },

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
    var canvas = document.getElementById('myCanvas');
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
    this.addClick(mouseX -30, mouseY -30);
    this.redraw();
  },

  keepPainting: function (e) {
    if (this.paint) {
      this.addClick(e.pageX - e.currentTarget.offsetLeft -30, e.pageY - e.currentTarget.offsetTop -30, true);
      this.redraw();
    }
  },

  redraw: function () {
    var canvas = document.getElementById('myCanvas');

    var context = canvas.getContext("2d");
    var self = this;
    // context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.lineJoin = "round";

    for (var i = 0; i < self.clickX.length; i++) {
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
    var view = this;
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.clickColor = [];
    this.clickSize = [];


    var content = this.template({course: this.model, current_user_id: current_user});
    this.$el.html(content);

    var current_user = $("div#user").text();

    view.$("ul.golf-icons").find("li.draggable").draggable({revert: true});

    view.$( "canvas" ).droppable({
      drop: function( event, ui ) {

        var draggedElpos = ui.offset;
        var canvasPos = $(this).offset();
        var top = draggedElpos.top - canvasPos.top;
        var left = draggedElpos.left - canvasPos.left;

        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var image = $(ui.draggable[0]).find("img")[0];

        ctx.drawImage(image, left, top, 40, 50);
      }
    });

    return this;
  }
});

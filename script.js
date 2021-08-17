//Send Touch Event
HTMLElement.prototype.sendTouchEvent = function(eventType, obj) {
  obj = obj == null ? {} : obj;
  let t = {
    x: 0,
    y: 0,
    rX: 0,
    rY: 0,
    angle: 0,
    force: 0
  }
  t.x = obj.x ? obj.x : t.x;
  t.y = obj.y ? obj.y : t.y;
  t.rX = obj.rX ? obj.rX : t.rX;
  t.rY = obj.rY ? obj.rY : t.rY;
  t.angle = obj.angle ? obj.angle : t.angle;
  t.force = obj.force ? obj.force : t.force;
  
  const touchObj = new Touch({
    identifier: Date.now(),
    target: this,
    clientX: t.x,
    clientY: t.y,
    pageX: t.x,
    pageY: t.y,
    screenX: t.x,
    screenY: t.y,
    radiusX: t.rX,
    radiusY: t.rY,
    rotationAngle: t.angle,
    force: t.force,
  });

  const touchEvent = new TouchEvent(eventType, {
    cancelable: true,
    bubbles: true,
    touches: [touchObj],
    targetTouches: [touchObj],
    changedTouches: [touchObj],
    shiftKey: true,
  });

  this.dispatchEvent(touchEvent);
}

//Send Touch Handler
HTMLElement.prototype.sendTouchHandler = function(typeHandler, o) {
  var el = this;
  var type = (typeHandler || "").toLowerCase();
  var obj = o == null ? {} : o;
  
  if (type == "tap") {
    el.sendTouchEvent("touchstart", obj);
    window.requestAnimationFrame(function() {
      el.sendTouchEvent("touchend", obj);
    });
  }
  if (type == "doubletap") {
    var count = 0;
    var dbltap;
    dbltap = setInterval(function() {
      if (count >= 2) { clearInterval(dbltap); }
      count += 1;
      el.sendTouchEvent("touchstart", obj);
      window.requestAnimationFrame(function() {
        el.sendTouchEvent("touchend", obj);
      });
    }, 50);
  }
}

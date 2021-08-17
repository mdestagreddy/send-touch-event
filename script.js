Node.prototype.sendTouchEvent = function(eventType, obj) {
  let t = {
    x: 0,
    y: 0,
    rX: 0,
    rY: 0,
    angle: 0,
    force: 0.5
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

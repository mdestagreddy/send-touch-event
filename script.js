//Sending Touch Event
function _sendTouchEventHandle(elem, eventType, obj) {
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
    target: elem,
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

  elem.dispatchEvent(touchEvent);
}

//Send Touch Event
HTMLElement.prototype.sendTouchEvent = function(eventType, obj) {
  _sendTouchEventHandle(this, eventType, obj);
}

//Send Touch Control
HTMLElement.prototype.sendTouchControl = function(typeControl, obj) {
  let el = this;
  let type = (typeControl || "").toLowerCase();
  
  if (type == "tap") {
    _sendTouchEventHandle(el, "touchstart", obj);
    window.requestAnimationFrame(() => {
      _sendTouchEventHandle(el, "touchend", obj);
    });
  }
  if (type == "doubletap") {
    let count = 0;
    let dbltap;
    dbltap = setInterval(() => {
      if (count >= 2) { clearInterval(dbltap); }
      count += 1;
      _sendTouchEventHandle(el, "touchstart", obj);
      window.requestAnimationFrame(() => {
        _sendTouchEventHandle(el, "touchend", obj);
      });
    }, 50);
  }
  if (type == "swipe") {
    this.swipe = function(start, end, duration) {
      let startPos = {x: 0, y: 0}
      let endPos = {x: 0, y: 0}
      startPos.x = start.x ? start.x : startPos.x;
      startPos.y = start.y ? start.y : startPos.y;
      endPos.x = end.x ? end.x : endPos.x;
      endPos.y = end.y ? end.y : endPos.y;
      _sendTouchEventHandle(el, "touchstart", {x: startPos.x, y: startPos.y});
      
      let anim = {
        startTime: performance.now(),
        current: 0,
        rAF: undefined,
        x: 0,
        y: 0
      }
      if (obj == null) {
        anim.rAF = function() {
          window.requestAnimationFrame(anim.rAF);
          if (anim.current > 1) {
            window.cancelAnimationFrame(anim.rAF);
            _sendTouchEventHandle(el, "touchend", {x: anim.x, y: anim.y});
          }
          anim.current = (0 - (anim.startTime - performance.now())) / duration;
          anim.x = startPos.x + ((endPos.x - startPos.x) * anim.current);
          anim.y = startPos.y + ((endPos.y - startPos.y) * anim.current);
          
          _sendTouchEventHandle(el, "touchmove", {
            x: anim.x,
            y: anim.y
          });
        }
      }
      else {
        let err = "No required 'obj' object.";
        console.error(err);
        throw Error(err);
      }
    }
  }
}

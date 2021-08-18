/**
  @2021 mdestagreddy Github
**/

// Import file
import { _sendTouchEventHandle } from './script.js'

// Automate Touch Event
function automateTouchEvent(el) {
  let t = this;
  t.arrays = [];
  t.recording = false;
  t.playing = false;
  t.count = 0;
  t.el = typeof el == "string" ? document.querySelector(el) : el;
  
  
  let listeners = (eventTypes, func) => {
    let arrays = eventTypes.split(" ");
    for (let i in arrays) {
      t.el.addEventListener(arrays[i].toLowerCase(), func);
    }
  }

  t.record = () => {
    if (t.playing != true && t.recording != true) {
      t.count = 0;
      t.arrays = [];
      t.recording = true;
    }
  }
  t.stopRecord = () => {
    if (t.playing != true) {
      t.recording = false;
    }
  }
  t.playAutomate = () => {
    let rAF;
    if (t.arrays.length != 0 && t.playing != true && t.recording != true) {
      t.playing = true;
      rAF = () => {
        if (count >= t.arrays.length) {
          t.count = 0;
        }
        if (count >= t.arrays.length || t.playing != true) {
          clearTimeout(rAF);
          t.playing = false;
        }
        else {
          setTimeout(rAF, t.arrays[Math.max(0, count - 1)].timestamp - t.arrays[count].timestamp);
        }
          
        _sendTouchEventHandle(t.el, t.arrays[count].type, {
          x: t.arrays[count].x,
          y: t.arrays[count].y,
        });
        t.count = Math.min(t.arrays.length, t.count + 1);
      }
      rAF();
    }
  }
  t.stopAutomate = () => {
    t.count = 0;
    t.playing = false;
  }
  t.pauseAutomate = () => {
    t.playing = false;
  }
  
  listeners("touchstart touchmove touchend touchcancel", (e) => {
    let touch = {}
    touch = {
      x: e.changedTouches ? e.changedTouches[0].clientX : 0,
      y: e.changedTouches ? e.changedTouches[0].clientY : 0,
      type: e.type,
      timestamp: Date.now();
    }
    if (t.recording == true) {
      t.arrays.push(touch);
    }
  });
}

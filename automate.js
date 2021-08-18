/**
  @2021 mdestagreddy Github
**/

// Import file
import { _sendTouchEventHandle } from './script.js'

// Automate Touch Event
function automateTouchEvent(el) {
  let t = this;
  t.el = typeof el == "string" ? document.querySelector(el) : el;
  t.listeners = (eventTypes, func) => {
    let arrays = eventTypes.split(" ");
    for (let i in arrays) {
      t.el.addEventListener(arrays[i].toLowerCase(), func);
    }
  }
}

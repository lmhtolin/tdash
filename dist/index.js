(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.tdash = {}));
})(this, (function (exports) { 'use strict';

  const debounce$1 = (fn, { timeout = 250, immediately = false }) => {
      let flag = false;
      let st;
      return (...args) => {
          clearTimeout(st);
          st = setTimeout(() => {
              flag = false;
              if (!immediately)
                  fn(...args);
          }, timeout);
          if (flag)
              return;
          flag = true;
          if (immediately) {
              fn(...args);
          }
      };
  };

  const throttle$1 = (fn, { timeout = 250, immediately = true }) => {
      let st;
      let lastTime;
      return (...args) => {
          clearTimeout(st);
          if (!lastTime && immediately) {
              fn(...args);
              lastTime = Date.now();
              return;
          }
          if (lastTime) {
              let gogo = Date.now() - lastTime >= timeout;
              clearTimeout(st);
              if (gogo) {
                  fn(...args);
                  lastTime = Date.now();
              }
              else {
                  st = setTimeout(() => {
                      fn(...args);
                      lastTime = Date.now();
                  }, timeout - Date.now() + lastTime);
              }
          }
          else {
              lastTime = Date.now();
              st = setTimeout(() => {
                  fn(...args);
                  lastTime = Date.now();
              }, timeout);
          }
      };
  };

  // tdashWrapper.ts

  const debounce = debounce$1;
  const throttle = throttle$1;

  exports.debounce = debounce;
  exports.throttle = throttle;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

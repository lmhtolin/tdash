export const throttle = (
  fn: (...args: any) => {},
  { timeout = 250, immediately = true }
) => {
  let st: any;
  let lastTime: number;
  return (...args: any) => {
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
      } else {
        st = setTimeout(() => {
          fn(...args);
          lastTime = Date.now();
        }, timeout - Date.now() + lastTime);
      }
    } else {
      lastTime = Date.now();
      st = setTimeout(() => {
        fn(...args);
        lastTime = Date.now();
      }, timeout);
    }
  };
};

export const debounce = (
  fn: (...args: any) => {},
  { timeout = 250, immediately = false }
) => {
  let flag = false;
  let st: any;
  return (...args: any) => {
    clearTimeout(st);
    st = setTimeout(() => {
      flag = false;
      if (!immediately) fn(...args);
    }, timeout);
    if (flag) return;
    flag = true;
    if (immediately) {
      fn(...args);
    }
  };
};

export const log = console.log;

export const curry =
  (f: any) =>
  (a: any, ..._: any) =>
    _.length ? f(a, ..._) : (..._: any) => f(a, ..._);

export const map = curry((f: any, iter: any) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

export const filter = curry((f: any, iter: any) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

export const reduce = curry((f: any, acc: any, iter: any) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

export const go = (...args: any) => reduce((a: any, f: any) => f(a), args);
export const pipe =
  (f: any, ...fs: any) =>
  (...as: any) =>
    go(f(...as), ...fs);

export const curry =
  (f: any) =>
  (a: any, ..._: any) =>
    _.length ? f(a, ..._) : (..._: any) => f(a, ..._);

export const range = function* (limit: number) {
  let i = -1;
  while (++i < limit) {
    yield i; // 디버그
  }
};

export const map = curry(function* (f: any, iter: Iterable<any>) {
  for (const a of iter) {
    yield f(a);
  }
});

export const filter = curry(function* (f: any, iter: any) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

export const take = curry((l: any, iter: any) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);

    if (res.length == l) return res;
  }
  return res;
});

export const takeAll = take(Infinity);
export const entries = function* (obj: any) {
  for (const k in obj) yield [k, obj[k]];
};

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

export const find = curry((f: any, iter: any) =>
  go(
    iter, // @ts-ignore
    filter(f),
    take(1),
    ([a]: any) => a,
  ),
);

export const flatten = function* (iter: any) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

export const flatMap = curry(pipe(map, flatten));

export const isIterable = (a: any) => a && a[Symbol.iterator];

// @ts-ignore
export const deepFlat = function* f(iter: any) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

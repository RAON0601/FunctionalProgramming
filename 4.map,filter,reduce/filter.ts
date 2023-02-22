export const filter = <A>(f: (x: A) => boolean, iter: Iterable<A>) => {
  const ret: A[] = [];

  for (const x of iter) {
    if (f(x)) ret.push(x);
  }

  return ret;
};

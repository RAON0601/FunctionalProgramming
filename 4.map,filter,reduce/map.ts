export const map = <A, B>(f: (a: A) => B, iter: Iterable<A>) => {
  const res: B[] = [];

  for (const a of iter) {
    res.push(f(a));
  }

  return res;
};

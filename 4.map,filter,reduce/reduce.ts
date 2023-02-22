export const reduce = <A>(
  f: (prev: A, cur: A) => A,
  iter: Iterable<A>,
  initValue: A | undefined,
) => {
  const iterator = iter[Symbol.iterator]();

  let acc: A;

  if (initValue !== undefined) {
    acc = initValue;
  } else {
    acc = iterator.next().value;
  }

  for (const x of iter) {
    acc = f(x, acc);
  }

  return acc;
};

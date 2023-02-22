export const reduce = <A>(
  f: (prev: A, cur: A) => A,
  iter: Iterable<A>,
  initValue?: A,
) => {
  const iterator = iter[Symbol.iterator]();

  let acc: A;
  let cur: IteratorResult<A>;

  if (initValue !== undefined) {
    acc = initValue;

    for (const a of iter) {
      acc = f(acc, a);
    }
  } else {
    cur = iterator.next();
    acc = cur.value;
    cur = iterator.next(); // 다음 값을 쓰기 위해서 한칸 이동

    while (!cur.done) {
      acc = f(acc, cur.value);
      cur = iterator.next();
    }
  }

  return acc;
};

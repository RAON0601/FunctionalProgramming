// 제너레이터와 이터레이터
// 제너레이터 이터레이터이자 이터레이터를 생성하는 함수

describe('제너레이터는 이터레이터인 동시에 이터레이터를 생성하는 함수이다', () => {
  it('이터레이터인가?', () => {
    function* gen() {
      yield 1;
      yield 2;
      yield 3;
    }

    const iter = gen();
    const iter2 = iter[Symbol.iterator]();

    expect(iter).toBe(iter2);
    expect(iter.next().value).toBe(1);
    expect(iter.next().value).toBe(2);
    expect(iter.next().value).toBe(3);
    expect(iter.next().done).toBe(true);
  });

  it('제너레이터를 활용한 함수 만들기 odd infinity limit', () => {
    function* infinity(i = 0) {
      while (true) yield i++;
    }

    function* limit(l: number, iter: Iterable<number>) {
      for (const a of iter) {
        yield a;
        if (a >= l) return;
      }
    }

    function* odd(l: number) {
      for (const a of limit(l, infinity(1))) {
        if (a % 2 === 1) yield a;
      }
    }

    const odds = [...odd(10)];
    expect(odds).toHaveLength(5);
    expect(odds).toContain(1);
    expect(odds).toContain(3);
    expect(odds).toContain(5);
    expect(odds).toContain(7);
    expect(odds).toContain(9);
  });
});

// 기존 리스트 순회
const log = console.log;
describe('기존 순회 방식', () => {
  it('length와 변수를 이용한 순회', () => {
    const list = [1, 2, 3, 4];
    for (let i = 0; i < list.length; i++) {
      log(list[i]);
    }
  });

  it('of 를 이용한 순회', () => {
    const list = [1, 2, 3, 4];
    for (const elem of list) {
      log(elem);
    }
  });

  it('Array를 통해 iterator 이해하기 ', () => {
    const arr = [1, 2, 3];
    let iter = arr[Symbol.iterator]();
    for (const a of iter) {
      log(a);
    }
  });

  it('Set을 통해 iterator 이해하기 ', () => {
    const arr = [1, 2, 3];
    const set = new Set(arr);
    let iter = set[Symbol.iterator]();

    for (const a of iter) {
      log(a);
    }
  });

  it('Map을 통해 iterator 이해하기 ', () => {
    const arr = [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ];

    // @ts-ignore
    const map = new Map(arr);
    let iter = map[Symbol.iterator]();

    for (const a of iter) {
      log(a);
    }
  });
});

describe('커스텀 이터러블 만들기', () => {
  const myIterable = {
    [Symbol.iterator]() {
      let i = 3;
      return {
        next() {
          return i === 0 ? { done: true } : { value: i--, done: false };
        },
        [Symbol.iterator]() {
          return this;
        },
      };
    },
  };

  it('커스텀 이터레이터 동작 테스트', () => {
    const iter = myIterable[Symbol.iterator]();
    const iter2 = iter[Symbol.iterator]();

    expect(iter.next().value).toBe(3);
    expect(iter.next().value).toBe(2);
    expect(iter.next().value).toBe(1);
    expect(iter.next().done).toBe(true);
    expect(iter2.next().done).toBe(true);
    expect(iter).toBe(iter2);
  });

  it('커스텀 이터레이터 for of', () => {
    const iter = myIterable[Symbol.iterator]();
    for (const a of iter) {
      console.log(a);
    }
  });

  it('커스텀 이터레이터 전개 연산자', () => {
    const arr = [...myIterable];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(3);
    expect(arr).toContain(2);
    expect(arr).toContain(1);
  });
});

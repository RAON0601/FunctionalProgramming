import { filter, flatMap, go, map, reduce, take, takeAll } from './lib';

describe('지연성 테스트', () => {
  it('1 ~ 10 까지의 합 지연성 X', () => {
    const users = [
      {
        name: 'a',
        age: 21,
        family: [
          { name: 'a1', age: 53 },
          { name: 'a2', age: 47 },
          { name: 'a3', age: 16 },
          { name: 'a4', age: 15 },
        ],
      },
      {
        name: 'b',
        age: 24,
        family: [
          { name: 'b1', age: 58 },
          { name: 'b2', age: 51 },
          { name: 'b3', age: 19 },
          { name: 'b4', age: 22 },
        ],
      },
      {
        name: 'c',
        age: 31,
        family: [
          { name: 'c1', age: 64 },
          { name: 'c2', age: 62 },
        ],
      },
      {
        name: 'd',
        age: 20,
        family: [
          { name: 'd1', age: 42 },
          { name: 'd2', age: 42 },
          { name: 'd3', age: 11 },
          { name: 'd4', age: 7 },
        ],
      },
    ];

    go(
      users, // @ts-ignore
      flatMap((u) => u.family),
      filter((u: any) => u.age > 20), // @ts-ignore
      map((u: any) => u.age),
      take(4),
      console.log,
    );
  });
});

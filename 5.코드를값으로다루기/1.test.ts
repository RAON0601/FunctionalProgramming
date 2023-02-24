import { makeProductFixture } from './fixture';
import { curry, filter, go, map, reduce } from './lib';

describe('함수를 값으로 다뤄서 표현력 높이기', () => {
  it('20000보다 가격이 낮은 products 가격 구하기', () => {
    const products = makeProductFixture();
    const add = (a: number, b: number) => a + b;

    const ret = go(
      products,
      (products: any) => filter((p: any) => p.price < 20000, products),
      (products: any) => map((p: any) => p.price, products),
      (prices: any) => reduce(add, prices),
    );

    expect(ret).toBe(30000);
  });

  it('20000보다 가격이 낮은 products 가격 구하기 2', () => {
    const products = makeProductFixture();
    const add = (a: number, b: number) => a + b;

    const ret = go(
      products,
      filter((p: any) => p.price < 20000),
      map((p: any) => p.price),
      reduce(add),
    );

    expect(ret).toBe(30000);
  });
});

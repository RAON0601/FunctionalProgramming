import { makeProductFixture } from './fixture';
import { filter, go, map, reduce } from './lib';

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

    /**
     * product를 뺄 수 있는 이유는
     */
    const ret = go(
      // 여기서 반환된 함수는 인자를 하나 받았기 때문에 실행 되지 않고 대기함 (go에게 전달)
      // 이후 go 함수가 reduce를 이용해 함수를 하나씩 호출함 따라서 filter map reduce에 products를 인자로 전달하면 실행 됨
      products,
      filter((p: any) => p.price < 20000),
      map((p: any) => p.price),
      reduce(add),
    );

    expect(ret).toBe(30000);
  });
});

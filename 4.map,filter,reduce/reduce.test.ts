import { reduce } from './reduce';
import { map } from './map';

interface Product {
  name: string;
  price: number;
}

describe('reduce 테스트', () => {
  const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
  ];

  it('상품 가격의 총 합 구하기 105000원 초기값 없는 경우', () => {
    const sum = (a: number, b: number) => a + b;

    const ret = reduce<number>(
      sum,
      map<Product, number>((p) => p.price, products),
    );

    expect(ret).toBe(105000);
  });

  it('상품 가격의 총 합 구하기 120000원 초기값 있는 경우', () => {
    const sum = (a: number, b: number) => a + b;
    const initValue = 15000;

    const ret = reduce<number>(
      sum,
      map<Product, number>((p) => p.price, products),
      initValue,
    );

    expect(ret).toBe(120000);
  });
});

import { filter } from './filter';
import exp from 'constants';

interface Product {
  name: string;
  price: number;
}

describe('map 테스트', () => {
  const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
  ];

  it('filter test 반팔티와 긴팔티만 고르기', () => {
    const condition = (p: Product) =>
      p.name === '반팔티' || p.name === '긴팔티';

    const ret = filter<Product>(condition, products);

    expect(ret).toHaveLength(2);
    expect(ret).toContainEqual({ name: '반팔티', price: 15000 });
    expect(ret).toContainEqual({ name: '긴팔티', price: 20000 });
  });
});

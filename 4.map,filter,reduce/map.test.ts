import { map } from './map';

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

  it('이름만 가져오기', () => {
    const ret = map<Product, string>((x) => x.name, products);

    expect(ret).toHaveLength(5);
    expect(ret).toContain('반팔티');
    expect(ret).toContain('긴팔티');
    expect(ret).toContain('핸드폰케이스');
    expect(ret).toContain('후드티');
    expect(ret).toContain('바지');
  });

  it('가격만 가져오기', () => {
    const ret = map<Product, number>((x) => x.price, products);

    expect(ret).toHaveLength(5);
    expect(ret).toContain(15000);
    expect(ret).toContain(25000);
    expect(ret).toContain(15000);
    expect(ret).toContain(30000);
    expect(ret).toContain(25000);
  });
});

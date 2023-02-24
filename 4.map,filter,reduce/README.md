# Map Filter Reduce 구현 해보기

## map 함수

<p>이터레이터를 받아서 함수를 수행하여 새로운 이터레이터를 반환한다.</p>

```ts
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
```

## filter 함수

<p>이터레이터와 predicate를받아서 predicate의 결과가 참인 요소들을 반환한다..</p>

```ts
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
```

## reduce 함수

<p>이터레이터와 콜백 함수를 받아서 콜백 함수의 결과 값을 누적 시켜서 반환한다.</p>
<p>초기 값이 없다면 이터레이터의 첫 번째 요소를 초기 값으로 할당한다.</p>

```ts
it('상품 가격의 총 합 구하기 105000원 초기값 없는 경우', () => {
    const sum = (a: number, b: number) => a + b;

    const ret = reduce<number>(
      sum,
      map<Product, number>((p) => p.price, products),
    );

    expect(ret).toBe(105000);
  });
```
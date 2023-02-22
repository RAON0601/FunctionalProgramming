import { add10, add5 } from './1';

describe('함수는 평가 되어 값을 만든다', () => {
  it('1 + 10은 11', () => {
    expect(add10(1)).toBe(11);
  });

  it('함수를 조합하여 로직을 추상화 할 수 있다.', () => {
    expect(add5(add10(1))).toBe(16);
  });
});

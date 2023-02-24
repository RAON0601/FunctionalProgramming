# 타입스크립트 포기

여기서 부터는 제네릭한 타입을 지정 하는 것이 힘들어서 js 코드로 진행

# curry 함수
<p>값을 머금고 있는 함수이다.</p>
<p>값을 머금고 있다가 추가적인 인자가 들어오면 함수를 실행하는 방식으로 사용한다.</p>

```js
const curry = f => a => b => f(a, b);
const sum = (a, b) => a + b;
const curriedSum = curry(sum);

console.log(curriedSum(1)(2)); // 3
```

# go 함수 With Curry
<p>go 함수를 이용하면 여러 함수를 조합하여 실행 해 준다.</p>
<p>축약형이 왜 저렇게 동작할 수 밖에 없는지 이해하기 위해서는 로직을 따라 가는게 굉장히 어려운데 reduce에 디버그 찍으면 확인하기 쉽다.</p>

```js
const go = (...args: any) => reduce((a, f) => f(a), args);

// 사용예시
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
);

/**
 * 1. 처음 go 함수가 실행되면 reduce의 acc에는 [products, filter, map, reduce]가 담기게 된다.
 * 2. redcue 함수는 초기값이 없다면 acc에서 초기값을 할당한다. acc = products
 * 3. 따라서 go의 iterator에는 [filter, map, reduce]만 남는다.
 * 4. 그리고 이때 go의 f는 (a, 함수) => 함수(a)이다.
 * 5. go는 reduce 함수를 이용하여 값을 누적시키기 때문에 iterator에서 함수를 꺼낸다.
 * 6. 첫번째 함수는 filter이고 이제 go의 iterator에서는 [map, reduce]만 남는다.
 * 7. filter(p => p.price < 20000)은 커링이 적용된 함수이므로 아래와 같이 호출이 가능하다.
 * 8. filter(p => p.price < 20000)(products);
 * 9. 다시 go 함수 입장으로 돌아오면 filter(p => p.price < 20000)는 go의 iterator에 전달된 함수이다.
 * 10.따라서 go 함수 내부에서 filter(products) 형태로 호출이 된다면 위의 코드가 정상 동작하는 것이 설명 된다.
 * 11.go 함수는 reduce 함수를 호출하기 때문에 acc = f(acc, 이터레이터에 존재하는 함수) 형태로 로직을 수행한다.
 * 12 filter는 이터레이터에 존재하는 함수이기 때문에 아래와 같은 식이 성립한다.
 * 13.acc = f(acc, filter), 이때  f = (a, 함수) => 함수(a)이다.
 * 14.따라서 위 수식은 acc = f(acc, filter) = filter(acc)이다.
 * 15.함수가 수행될 때 acc = products 이므로 위 수식을 다시 정리하면
 * 16. products =  filter(products)가 된다. 따라서 8번에 의해 호출이 되기 때문에 위와 같은 축약형은 당연하다.
 * */
```

# 제너레이터를 이용한 지연 평가

<p>
제너레이터를 사용하여 map filter reduce 같은 함수를 구현하게 되면 지연 평가를 구현할 수 있다.
</p>

```js
export const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});
```

<p>
    기존에는 제너레이터를 사용하지 않아서 filter 함수가 호출 되면 이터레이터에 있는 모든 값에 대해 연산을 수행한다.
</p>

```js
export const filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});
```

<br>

<p>
    제너레이터를 이용하면 값이 필요할 때만 호출된다. <br>
    잘 이해가 되지 않는다면 같이 아래 코드를 살펴보자
</p>

<br>

```js
go(
  users, // [ ... 길이 100000개의 유저배열]
  filter(u => u.age > 30), // 제너레이터이므로 이터레이터가 반환됨 동시에 이터레이터를 사용함 (로직을 수행하기 위해 users 한개 사용!)
  map(u => u.age), // 제너레이터이므로 이터레이터가 반환됨 동시에 이터레이터를 사용함 ( filter에서 전달 받은 이터레이터 호출)
  take(4), // 이터레이터를 사용하겠다고 호출함 (map의 이터레이터 호출)
  console.log,
);

// take 함수는 iterator를 직접 호출하여 값을 반환한다.
export const take = curry((l: any, iter: any) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);

    if (res.length == l) return res;
  }
  return res;
});

```

<br>

<h2>주요 실행 원리</h2>

1. 제너레이터는 이터레이터를 반환한다.
2. 따라서 filter map의 반환값은 모두 이터레이터이다.
3. take에서 값을 사용하기 위해 iterater를 호출한다.
4. 각 이터레이터에서 반환된 이터레이터들은 값을 호출하기 위해 내부적으로 next를 호출한다. (for of 문)
5. 제너레이터는 값을 반환할 수 있다면 모든 로직을 호출하지 않고 한 번씩만 호출된다.
6. 그래서 go 함수에 전달된 함수들은 세로 방향으로 계속해서 평가 된다.
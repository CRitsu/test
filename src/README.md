# Technology Selection - the Redux

**Install**

```
$ npm install --save react-redux
```

**Concept**

所有 State 的改变都由 Redux 来执行。

在没有使用 Redux 的应用中以 `setState()` 方式改变 State 的地方都改成触发一个相应的 `Action` ，这个 `Action` 一定包括一个 type 属性，区分事件的类别，通常是一个字符串常量，除此之外可以包含任何需要的属性。这个 `Action` 将被传递到 Reducer，然后在 Reducer 中处理具体动作和改变 State。

数据的流动清晰明了。

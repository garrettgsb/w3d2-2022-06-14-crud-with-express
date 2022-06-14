const someObj = {
  foo: 1,
  bar: 200,
};

// This...
const foo = someObj.foo
const bar = someObj.bar
// ...is equivalent to this
const { foo, bar } = someObj




const someArr = ['banana', 'pineapple'];

// This...
const [fruit1, fruit2] = someArr;
// ...is equivalent to this
const fruit1 = someArr[0];
const fruit2 = someArr[1];

// let func = function foo() {
//   return "hello";
// };

// console.log(typeof foo); // undefined
// console.log(typeof func); // function
// //  在命名函数表达式中，名称只在函数体内部是局部的，外部无法访问。因此，全局作用域中不存在foo。
// //  typeof运算符对未定义的变量返回undefined。

// function foo(bar, getBar = () => bar) {
//   var bar = 10;
//   console.log(getBar());
// }

// foo(5); //  5

// Promise.resolve(1)
//   .then((x) => {
//     throw x;
//   })
//   .then((x) => console.log(`then ${x}`))
//   .catch((err) => console.log(`error ${err}`))
//   .then(() => Promise.resolve(2))
//   .catch((err) => console.log(`error ${err}`))
//   .then((x) => console.log(`then ${x}`));
// // error 1
// // then 2

/**
 * 防抖
 */

// function debounce(fn, delay) {
//   let timer = null;
//   return function () {
//     clearTimeout(timer);

//     timer = setTimeout(() => {
//       fn.apply(this, arguments);
//     }, delay);
//   };
// }

// function fn(val) {
//   console.log(val || 1);
// }
// const a = debounce(fn, 1000);
// for (let i = 0; i < 10; i++) {
//   a();
// }

/**
 * 节流
 */
// function throttle(fun, delay) {
//   let isThrottle = false;
//   let lastArgs = null;
//   return function (...args) {
//     if (!isThrottle) {
//       isThrottle = true;
//       fun.apply(this, args);
//       setTimeout(() => {
//         isThrottle = false;
//         fun.apply(this, lastArgs);
//       }, delay);
//     } else {
//       lastArgs = args;
//     }
//   };
// }

/**
 * 递归遍历实现 深拷贝
 */

// function deepClone(obj) {
//   if (obj === null || typeof obj !== "object") {
//     return obj; // 基本数据类型和null直接返回
//   }
//   if (Array.isArray(obj)) {
//     // 数组 创建一个新的数组 并递归复制每个子元素
//     const copyArr = [];
//     for (const i = 0; i < obj.length; i++) {
//       copyArr[i] = deepClone(obj[i]);
//     }
//     return copyArr;
//   }
//   // 对象 创建一个新对象 并递归复制每个属性
//   const copyObj = {};
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       copyObj[key] = deepClone(obj[key]);
//     }
//   }
//   return copyObj;
// }
// const originalObject = {
//   name: "John",
//   age: 30,
//   address: {
//     street: "123 Main St",
//     city: "New York",
//   },
// };

// const copiedObject = deepClone(originalObject);

// console.log(copiedObject); // 输出深拷贝后的对象

// // 修改复制后的对象，不会影响原对象
// copiedObject.name = "Alice";
// copiedObject.address.city = "Los Angeles";

// console.log(originalObject); // 原对象不受影响
// console.log(copiedObject);

/**
 * 数组打乱
 */

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function MixArr(arr) {
//   return arr.sort(() => {
//     return Math.random() - 0.5;
//   });
// }

// MixArr(arr);
// console.log(arr);

//手写 promise

// class MyPromiser {
//   static PENDING = "待定";
//   static FULFILLED = "成功";
//   static REJECTED = "拒绝";
//   constructor(func) {
//     this.status = MyPromiser.PENDING;
//     this.result = null;
//     this.resolveCallbacks = [];
//     this.rejectCallbacks = [];
//     try {
//       func(this.resolve.bind(this), this.reject.bind(this));
//     } catch (error) {
//       this.reject(error);
//     }
//   }
//   resolve(result) {
//     setTimeout(() => {
//       if (this.status === MyPromiser.PENDING) {
//         this.status = MyPromiser.FULFILLED;
//         this.result = result;
//         this.resolveCallbacks.forEach((cb) => {
//           cb(result);
//         });
//       }
//     });
//   }
//   reject(result) {
//     setTimeout(() => {
//       if (this.status === MyPromiser.PENDING) {
//         this.status = MyPromiser.REJECTED;
//         this.result = result;
//         this.rejectCallbacks.forEach((cb) => {
//           cb(result);
//         });
//       }
//     });
//   }

//   then(ONFULFILLED, ONREJECTED) {
//     return new MyPromiser((resolve, reject) => {
//       ONFULFILLED = typeof ONFULFILLED === "function" ? ONFULFILLED : () => {};
//       ONREJECTED = typeof ONREJECTED === "function" ? ONREJECTED : () => {};
//       if (this.status === MyPromiser.PENDING) {
//         this.resolveCallbacks.push(ONFULFILLED);
//         this.rejectCallbacks.push(ONREJECTED);
//       }
//       if (this.status === MyPromiser.FULFILLED) {
//         setTimeout(() => {
//           ONFULFILLED(this.result);
//         });
//       }
//       if (this.status === MyPromiser.REJECTED) {
//         setTimeout(() => {
//           ONREJECTED(this.result);
//         });
//       }
//     });
//   }
// }

// console.log("第一步");

// const p = new MyPromiser((resolve, reject) => {
//   console.log("第二步");
//   setTimeout(() => {
//     resolve("第四步");
//   });
// });

// p.then(
//   (res) => {
//     console.log("111");
//     console.log(res);
//   },
//   (error) => {
//     console.log("error");
//   }
// ).then(
//   () => {
//     console.log("第五步");
//   },
//   () => {
//     console.log("第六步");
//   }
// );

// console.log("第三步");

// class MyPromise {
//   static PENDING = "pending";
//   static FULFILLED = "fulfilled";
//   static REJECTED = "rejected";

//   constructor(func) {
//     this.status = MyPromise.PENDING;
//     this.result = null;
//     this.resolveCallbacks = [];
//     this.rejectCallbacks = [];

//     const resolve = (result) => {
//       if (this.status === MyPromise.PENDING) {
//         this.status = MyPromise.FULFILLED;
//         this.result = result;
//         this.resolveCallbacks.forEach((cb) => {
//           queueMicrotask(() => {
//             try {
//               const nextResult = cb(this.result);
//               resolveNextPromise(this.nextPromise, nextResult);
//             } catch (error) {
//               this.reject(error);
//             }
//           });
//         });
//       }
//     };

//     const reject = (result) => {
//       if (this.status === MyPromise.PENDING) {
//         this.status = MyPromise.REJECTED;
//         this.result = result;
//         this.rejectCallbacks.forEach((cb) => {
//           queueMicrotask(() => {
//             try {
//               const nextResult = cb(this.result);
//               resolveNextPromise(this.nextPromise, nextResult);
//             } catch (error) {
//               this.reject(error);
//             }
//           });
//         });
//       }
//     };

//     const resolveNextPromise = (nextPromise, result) => {
//       if (nextPromise instanceof MyPromise) {
//         if (result instanceof MyPromise) {
//           result.then(
//             (value) => resolveNextPromise(nextPromise, value),
//             (reason) => nextPromise.reject(reason)
//           );
//         } else {
//           nextPromise.resolve(result);
//         }
//       }
//     };

//     try {
//       func(resolve, reject);
//     } catch (error) {
//       this.reject(error);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     return (this.nextPromise = new MyPromise((resolve, reject) => {
//       onFulfilled =
//         typeof onFulfilled === "function" ? onFulfilled : (value) => value;
//       onRejected =
//         typeof onRejected === "function" ? onRejected : (reason) => reason;

//       if (this.status === MyPromise.PENDING) {
//         this.resolveCallbacks.push(onFulfilled);
//         this.rejectCallbacks.push(onRejected);
//       }
//       if (this.status === MyPromise.FULFILLED) {
//         queueMicrotask(() => {
//           try {
//             const nextResult = onFulfilled(this.result);
//             resolveNextPromise(this.nextPromise, nextResult);
//           } catch (error) {
//             this.reject(error);
//           }
//         });
//       }
//       if (this.status === MyPromise.REJECTED) {
//         queueMicrotask(() => {
//           try {
//             const nextResult = onRejected(this.result);
//             resolveNextPromise(this.nextPromise, nextResult);
//           } catch (error) {
//             this.reject(error);
//           }
//         });
//       }
//     }));
//   }

//   reject(reason) {
//     if (this.status === MyPromise.PENDING) {
//       this.status = MyPromise.REJECTED;
//       this.result = reason;
//       this.rejectCallbacks.forEach((cb) => {
//         queueMicrotask(() => {
//           try {
//             const nextResult = cb(this.result);
//             resolveNextPromise(this.nextPromise, nextResult);
//           } catch (error) {
//             this.reject(error);
//           }
//         });
//       });
//     }
//   }
// }

// console.log("第一步");

// const p = new MyPromise((resolve, reject) => {
//   console.log("第二步");
//   setTimeout(() => {
//     resolve("第四步");
//   });
// });

// p.then(
//   (res) => {
//     console.log("111");
//     console.log(res);
//     return "第七步";
//   },
//   (error) => {
//     console.log("error");
//   }
// ).then((res) => {
//   console;
// });

// 手写 call

Function.prototype.myCall = function (context) {
  // 首先，检查是否调用 myCall 的对象是一个函数
  if (typeof this !== "function") {
    throw new Error("Only functions can be called.");
  }
  //判断改变后的上下文对象是null和undefined的时候 this应该指向window
  if (context === null || context === undefined) {
    context = globalThis;
  }
  const type = typeof context;
  //如果改变后的上下文对象是基本包装类型，则this指向其包装对象
  switch (type) {
    case "number":
      context = new Number(context);
      break;
    case "boolean":
      context = new Boolean(context);
      break;
    case "string":
      context = new String(context);
      break;
  }
  /**
    梳理：
       1.fn1.myCall调用，所以这里的this指向的就是fn1,
        给context扩展一个方法，这个方法就是fn1:context[uniqueProperty] = this;
       2.context就是改变之后的上下文对象
       3.然后调用context的扩展的这个方法，fn1就会被调用，并且this指向了context
   **/

  console.log("context", context); // { name: '小北', age: 19 }
  console.log("arg", arguments); //  { '0': { name: '小北', age: 19 }, '1': 1, '2': 2 }
  console.log("this", this); //  fn1
  // 从参数列表中提取函数的参数，排除第一个参数（上下文）
  const args = Array.from(arguments).slice(1);
  //给context扩展的方法名要是一个独一无二的值，防止覆盖原有方法
  const uniqueProperty = Symbol("uniqueProperty");
  context[uniqueProperty] = this;
  const result = context[uniqueProperty](...args);
  // 删除context上添加的方法
  delete context[uniqueProperty];
  return result;
};

const p = {
  name: "小北",
  age: 19,
};

function fn1(...args) {
  console.log(this.name + this.age, args);
}

fn1.myCall(p, 1, 2); // 小北19 [ 1, 2 ]

// 手写 apply
// Function.prototype.myApply = function (context, args) {
//   if (typeof this !== "function") {
//     throw new Error("");
//   }

//   context = context || globalThis;
//   args = args || [];
//   const key = Symbol("myApply");
//   context[key] = this;
//   const result = context[key](args);
//   delete context[key];
//   return result;
// };

// const p = {
//   name: "小北",
//   age: 19,
// };

// function fn1(args) {
//   console.log(this.name + this.age, args);
// }

// fn1.myApply(p, [1, 2]);

// 手写bind

// Function.prototype.myBind = function (context, ...args) {
//   if (typeof this !== "function") {
//     throw new Error("");
//   }

//   context = context || globalThis;
//   args = args || [];
//   const key = Symbol("myBind");
//   context[key] = this;
//   return function () {
//     const result = context[key](...args, ...arguments);
//     delete context[key];
//     return result;
//   };
// };

// const p = {
//   name: "小北",
//   age: 19,
// };

// function fn1(args) {
//   console.log(this.name + this.age, args);
// }

// const fn2 = fn1.myBind(p);
// fn2([1, 2]);

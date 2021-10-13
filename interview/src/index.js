
// 1==========================================大数相加=====================================================================

// 注意由于这两个已经超过了Number范围，因此不能用Number存，这里我们选择使用字符串存储。
// 我们只要将两个数字前面补0至相同的长度，然后从低位到高位进行相加， 同时用一个变量记录进位的信息即可。

function bigNumberSum(a, b) {
    // 123456789
    // 000009876

    // padding
    let cur = 0;
    while (cur < a.length || cur < b.length) {
      if (!a[cur]) {
        a = "0" + a;
      } else if (!b[cur]) {
        b = "0" + b;
      }
      cur++;
    }
    //进位
    let carried = 0;
    const res = [];

    for (let i = a.length - 1; i > -1; i--) {
        //+转换为number
      const sum = carried + +a[i] + +b[i];
      if (sum > 9) {
        carried = 1;
      } else {
        carried = 0;
      }
      res[i] = sum % 10;
    }
    if (carried === 1) {
      res.unshift(1);
    }

    return res.join("");
  }
  console.log(bigNumberSum('123456789', '1111'))





// 2.=====================实现Function.prototype.bind,call,apply的功能=========================

Function.prototype.myBind = function(ctx, ...args) {
  return (...innerArgs) => this.call(ctx, ...args, ...innerArgs);
};

// test
const a = {
  name: "name of a"
};
function test(...msg) {
  console.log(this.name);
  console.log(...msg);
}
const t = test.myBind(a, "hello");
t("world");
console.log("hello","world")
//============================================================================
Function.prototype.newCall = function(context, ...parameter) {
  if (typeof context === 'object') {
    context = context || window
  } else {
    context = Object.create(null)
  }
  // 当对象本身就有fn这个方法的时候，就有大问题了。
  // 当call传入的对象是null的时候，或者其他一些类型的时候，函数会报错。
  let fn = Symbol()
  context[fn] = this
  context[fn](...parameter);
  delete context[fn]
}
let person = {
  name: 'Abiel'
}
function sayHi(age,sex) {
  console.log(this.name, age, sex);
}
sayHi.newCall (person, 25, '男'); // Abiel 25 男
//==================================================================================
Function.prototype.newApply = function(context, parameter) {
  if (typeof context === 'object') {
    context = context || window
  } else {
    context = Object.create(null)
  }
  let fn = Symbol()
  context[fn] = this
  context[fn](...parameter);
  delete context[fn]
}





// 3.===========================================实现两个数字相加的功能，要求不能使用编程语言现有的四则运算。============
function twoSum(num1, num2) {
  while (num2 != 0)
  {
  //因为位运算加法，0+1=1,1+0=1，0+0=0,1+1=0(但是要进位)，所以跟异或有点类似
  //但是当num1&num2的时候，当为一的时候需要左移一位，表示进位。
    let temp = num1^num2;
    num2 = (num1&num2) << 1;
    num1 = temp;
  }
  return num1;
}

console.log(twoSum(8, 3))




// 4.???????===========================================柯里化。================================================
// 实现函数curry，该函数接受一个多元（多个参数）的函数作为参数，然后一个新的函数，这个函数 可以一次执行，也可以分多次执行。
// 实际上就是把add函数的x，y两个参数变成了先用一个函数接收x然后返回一个函数去处理y参数。现在思路应该就比较清晰了，就是只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

function curry (fn, arr = []) {
    return fn.length === arr.length ? fn.apply(null, arr) : function (...args) {
        return curry (fn, arr.concat(args))
    }
}








function curry(fn) {
  const ctx = this;
  console.log('---',ctx)
  function inner(...args) {
    if (args.length === fn.length) return fn.call(ctx, ...args);
    return (...innerArgs) => inner.call(ctx, ...args, ...innerArgs);
  }

  return inner;
}

// test
function test(a, b, c) {
  console.log(a+b+c);
}

const f1 = curry(test)(1);
const f2 = f1(2);
f2(3);

// 5.=========================================实现函数compose，compose接受多个函数作为参数，并返回一个新的函数，新的函数会从右向左依次执行原函数， 并且上一次结果的返回值将会作为下一个函数的参数。========
function compose(...fns) {
  return (...args) => fns.reduceRight((acc, cur) => cur(acc), ...args);
}

// 参数均为函数, 返回值也是函数
// 第一函数接受参数, 其他函数接受的上一个函数的返回值
// 第一个函数的参数是多元的, 其他函数的一元的
// 自右向左执行

var compose = function (...fns) {
  var len = fns.length // 记录我们传入所有函数的个数
  var index = len - 1 // 游标记录函数执行情况, 也作为我们运行fns中的中函数的索引
  var reslut // 结果, 每次函数执行完成后, 向下传递
  // console.log(fns)
  return function f1(...arg1) {
    reslut = fns[index](...arg1)
    // reslut = fns[index].apply(this, arg1)
    if (index <= 0) {
      return reslut
    } else {
      --index
      return f1(reslut)
      // return f1.call(null, result)
    }
  }
}


function a(msg) {
  return msg + "a";
}
function b(msg) {
  return msg + "b";
}
function c(msg) {
  return msg + "c";
}

const f = compose(
  a,
  b,
  c
);
console.log(f("hello"));


// 6.========================================深拷贝=======================================
function deepCopy(o) {
  if (typeof o !== "object") return o;
  let n;
  if (Array.isArray(o)) {
    n = new Array(o.length);
    o.forEach((v,i) => (n[i] = deepCopy(v)));
  }

  // reg math function 等其他类型暂时不考虑
  else if (!Array.isArray(o)) {
    n = {};
    Object.keys(o).forEach(key => {
      n[key] = deepCopy(o[key]);
    });
  }

  return n;
}


// 7.========================================继承=======================================
function extend(A, B) {
  function f() {}
  f.prototype = B.prototype;
  A.prototype = new f();
  A.prototype.constructor = A;
}

function A(name) {
  this.name = name;
}
function B(name) {
  this.name = name;
}
extend(A, B);
B.prototype.say = function() {
  console.log("b say");
};
A.prototype.eat = function() {
  console.log("a eat");
};

const a = new A("a name");

console.log(a.name);
a.say();
a.eat();

// 8.========================================getUrlParams=======================================
// 给定key，求解href中的value，如果有多个，返回数组。如果没有返回null
function getUrlParams(key, href) {
  const query = href.split("?");
  // console.log(query)
  if (query.length <= 1) return null;
  // a=1&b=2&a=3
  const pairs = query[1].split("&");
  const res = pairs
    .filter(pair => {
      const [k] = pair.split("=");
      if (k === key) return true;
      return false;
    })
    .map(pair => {
      const [, v] = pair.split("=");
      return v;
    });
  if (res.length === 0) return null;
  if (res.length === 1) return res[0];
  return res;
}

const a = getUrlParams("a", "http://lucifer.ren?a=1&b=2&a=3");
const b = getUrlParams("b", "http://lucifer.ren?a=1&b=2&a=3");
const c = getUrlParams("c", "http://lucifer.ren?a=1&b=2&a=3");

console.log(a);
console.log(b);
console.log(c);




//9.========================================用 reduce 实现 map =======================================
function implementMapUsingReduce(list, func) {
  return list.reduce((acc, cur, i) => {
    acc[i] = func(cur);
    return acc;
  }, []);
}
const a = implementMapUsingReduce([1, 2, 3, 4], a => a + 1); // [2,3,4,5]
console.log(a);


//数组之和
var sum = arr.reduce(function (prev, cur) {
  return prev + cur;
},0);

//最大值
var max = arr.reduce(function (prev, cur) {
  return Math.max(prev,cur);
});

//数组去重
var newArr = arr.reduce(function (prev, cur) {
  prev.indexOf(cur) === -1 && prev.push(cur);
  return prev;
},[]);




//10.========================================实现 lensProp=======================================
// 给定一个字符串， 比如lensProp(a, obj) 返回 'obj.a'的值
function lensProp(lens, obj) {
  const keys = lens.split(".");
  //传不合法
  if (keys.lenngth < 1) return;
  return keys.reduce((acc, cur) => (acc !== undefined ? acc[cur] : acc), obj);
}

const a = lensProp("a", { a: 1 }); // 1
const b = lensProp("b", { a: 1 }); // undefined
const c = lensProp("a.b", { a: { b: "c" } }); // c
const d = lensProp("a.b.c.d.e.f", { a: { b: "c" } }); // undefined

console.log(a);
console.log(b);
console.log(c);
console.log(d);



//11.========================================实现简化的 promise=======================================
function Promise(func) {
  this.fullfilled = false;
  this.rejected = false;
  this.pending = true;
  this.handlers = [];
  this.errorHandlers = [];
  function resolve(...args) {
    this.handlers.forEach(handler => handler(...args));
  }
  function reject(...args) {
    this.errorHandlers.forEach(handler => handler(...args));
  }
  func.call(this, resolve.bind(this), reject.bind(this));
}

Promise.prototype.then = function(func) {
  this.handlers.push(func);
  return this;
};
Promise.prototype.catch = function(func) {
  this.errorHandlers.push(func);
  return this;
};

Promise.race = promises =>
  new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject);
    });
  });

Promise.all = promises =>
  new Promise((resolve, reject) => {
    let len = promises.length;
    let res = [];
    promises.forEach((p, i) => {
      p.then(r => {
        if (len === 1) {
          resolve(res);
        } else {
          res[i] = r;
        }
        len--;
      }, reject);
    });
  });

// test
const p1 = new Promise(resolve =>
  setTimeout(resolve.bind(null, "resolved"), 3000)
);
const p2 = new Promise((resolve, reject) =>
  setTimeout(reject.bind(null, "rejected"), 3000)
);
const p3 = new Promise((resolve, reject) =>
  setTimeout(resolve.bind(null, "rejected"), 3000)
);

// p1.then((...args) => console.log(...args))
//   .then((...args) => console.log("second", ...args));

p1.then(function(result){
  // console.log(result)
  return p2
})
  .then(function(result){
    console.log('sesd',result)
  })
  .catch((...args) => console.log("fail", ...args));;

p2.then((...args) => console.log(...args))
  .catch((...args) => console.log("fail", ...args));





//12.=================================简单的模板引擎========================
// 正则表示默认是贪婪匹配，如果实现懒惰匹配，在量词元字符后面添加一个？即可。

// 如果使用贪婪匹配，我们会匹配到最后一个}}，而不是第一个结束的}}。
function render(tpl, data) {
  return tpl.replace(/\{\{(.+?)\}\}/g, function($1, $2) {
    // $1 分组为 类似 {{name}}
    // $2 分组为 类似 name
    // 加上面的小括号就是为了方便拿到key而已
    console.log($1,$2)
    console.log(RegExp.$1)
    //RegExp.$1 = $2
    return data[$2];
  });
}


let dataren = render("我是{{name}}，年龄{{age}}", {
  name: "lucifer",
  age: 17
});
console.log(dataren)



//13.=================================实现一个极简的数据响应式========================
// 实现一个极简的数据响应式
// 有一个全局变量 a，有一个全局函数 b，实现一个方法bindData，执行后，a中任何属性值修改都会触发b的执行。
const a = {
  b: 1
};
function b() {
  console.log("a的值发生改变");
}
bindData();
// 此时输出 a的值发生改变
a.b = 2; 

console.log(a.b);

function bindData() {
  Object.keys(a).forEach(key => {
    let v = a[key];
    Object.defineProperty(a, key, {
      get() {
        console.log('你正在读取a里面的值');
        return v;
      },
      set(newA) {
        v = newA;
        b();
      }
    });
  });
}


//14.=================================已知数据格式，实现一个函数 fn 找出链条中所有的父级 id========================

const list = [{
  id: '1',
  name: 'test1',
  children: [
      {
          id: '11',
          name: 'test11',
          children: [
              {
                  id: '111',
                  name: 'test111'
              },
              {
                  id: '112',
                  name: 'test112'
              }
          ]

      },
      {
          id: '12',
          name: 'test12',
          children: [
              {
                  id: '121',
                  name: 'test121'
              },
              {
                  id: '122',
                  name: 'test122'
              }
          ]
      }
  ]
}];
const id = '112'
const fn = (value) => {
//...
}
fn(id, list) // 输出 [1， 11， 112]

function fn(id, list) {
  const match = list.find(item => item.id === id);
  if (match) return [id];
  const sub = list.find(item => id.startsWith(item.id));
  return [sub.id].concat(fn(id, sub.children));
}




//15.=================================将所有页面元素按照出现次数降序排序输出。========================

function getAllHTMLTags() {
  const mapper = {};
  const tags = [...window.document.querySelectorAll("*")].map(
    dom => dom.tagName
  );
  // 获取当前页面中所有 HTML tag 的 名字，以数组形式输出, 重复的标签不重复输出
  // return [...new Set(tags)];
  for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      if (mapper[tag] === void 0) {
          mapper[tag] = 1;
      }
      else mapper[tag] += 1;
  }

  return Object.entries(mapper).sort((a, b) => b[1] - a[1]).map(q => q[0]);
}




//16.=================================实现一个函数，生成某个DOM元素的xpath，主要包含两部分：标签层级和兄弟元素中的顺序========================
function helper(node, path) {
  if (node === document.body) return `body ${path}`;

  const i = Array.prototype.findIndex.call(node.parentNode.children, el => el === node)
  // return  helper(node.parentNode, `${path} > ${node.tagName.toLowerCase()}[${i}]`);
  return  helper(node.parentNode, `${node.tagName.toLowerCase()}[${i}] > ${path}  `);
}

function XPath(node) {
  return helper(node, '');
}


//17.=================================千分位转数字========================
function numFormat(str) {
  return str.replace(/[^\d]/g, '');
}
console.log(numFormat("$1,2324"))




// //18.=================================二叉树========================

function tree(obj) {
    var obj = obj.split(')');
    obj.pop();
    var newobj = [];
    for (var i = 0; i < obj.length; i++) {
        newobj.push(obj[i].replace('(', ''));
    }
    var root = {
        value: null, left: null, right: null, have: 0
    }
    var u;
    for (var i = 0; i < newobj.length; i++) {
        var a1 = newobj[i].split(',')[0];
        var a2 = newobj[i].split(',')[1];
        u = root;
        if (a2 !== '') {
            for (var j = 0; j < a2.length; j++) {
                if (a2[j] === 'L') {
                    if (u.left === null) {
                        u.left = newnode();
                        u = u.left;
                    } else {
                        u = u.left;
                    }
                } else if (a2[j] === 'R') {
                    if (u.right === null) {
                        u.right = newnode();
                        u = u.right;
                    } else {
                        u = u.right;
                    }
                }
            }
            if (u.have === 1) {
            } else {
                u.value = a1;
                u.have = 1;
            }
        } else {
            root.value = a1;
            u.have = 1;
        }
    }
    return root;
}

// 1.实现typeof与instanceof
// Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
// 超出功能范围，应限定7种数据类型
// typeof [] === 'array' // false
// myTypeof([]) === 'array' // true
function myTypeof(params){
    const type = Object.prototype.toString.call(params).slice(8, -1).toLowerCase()
    const map = {
      'number': true,
      'string': true,
      'boolean': true,
      'undefined': true,
      'bigint': true,
      'symbol': true,
      'function': true
    }
    return map[type] ? type : 'object'
}
// console.log(myTypeof('1'))


// 判断一个对象的具体类型可以考虑用 instanceof
// 实例对象的__proto__指向的是 该实例对象所在构造函数的原型对象（prototype）
// 构造函数的原型对象（prototype）指向发生变化，实例对象的__proto__也会随之变化
function myInstanceof(val,type) {
    let proto = Object.getPrototypeOf(val)
    while(true) {
        if(proto == null) return false
        if(proto == type.prototype) return true
        console.log(proto)
        proto = proto.__proto__ 
    }
}
// console.log(myInstanceof([],Object))
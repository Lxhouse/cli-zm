## 场景题汇总

### 解决浮点数相加精度问题

#### 请实现一个函数 add(a, b)，接受两个浮点数 a 和 b，返回它们的精确和。示例：add(0.1, 0.2) 应返回 0.3。

```js
function add(a, b) {
function getLen(value) {
return value.toString().split(".")[1].length;
}
const aL = getLen(a);
const bL = getLen(b);
const maxLen = Math.pow(10, Math.max(aL, bL));
return (maxLen _ a + maxLen _ b) / maxLen;
}
```

### 大数相加

#### 实现一个函数 addStrings(num1, num2)，接收两个字符串表示的非负整数 num1 和 num2，返回它们的和，结果也应为字符串形式。示例：addStrings("123", "456") 应返回 "579"。

```js
function addStrings(num1, num2) {
  const arr1 = num1.split('');
  const arr2 = num2.split('');

  let pre = 0;
  let result = '';

  while (arr1.length > 0 || arr2.length > 0 || pre > 0) {
    const a = arr1.pop() || '0';
    const b = arr2.pop() || '0';
    const c = Number(a) + Number(b) + pre;
    pre = Math.floor(c / 10);
    result = `${c % 10}${result}`;
  }

  return result;
}
```

### 大数相乘

#### 请实现一个函数 multiplyStrings(num1, num2)，接受两个字符串表示的非负整数 num1 和 num2，返回它们的乘积，结果也应为字符串形式。示例：multiplyStrings("123", "456") 应返回 "56088"。

```js
function multiplyStrings(num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';
  const result = new Array(num1.length + num2.length).fill(0);
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const mul = (num1[i] - '0') * (num2[j] - '0');
      const sum = mul + result[i + j + 1];

      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }
  return result.join('').replace(/^0+/, '') || '0';
}
```

### 数组乱序输出

#### 编写一个函数 shuffleArray(arr)，接受一个数组 arr，返回一个乱序的新数组。示例：shuffleArray([1, 2, 3, 4]) 应返回一个包含相同元素但顺序随机的新数组。

```js
function fisherYatesShuffle(arr) {
  const shuffled = arr.slice(); // 创建副本，避免修改原数组
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 生成随机索引
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 交换
  }
  return shuffled;
}
```

### 数组去重

#### 实现一个函数 removeDuplicates(arr)，接受一个数组 arr，返回一个新数组，其中包含原数组中所有唯一的元素。请提供至少七种不同的方法来完成这个任务。

```js
//1
function removeDuplicates(arr) {
  return Array.from(new Set(arr));
}
//2
function removeDuplicates(arr) {
  return arr.reduce((pre, cur) => {
    if (pre.find((e) => e === cur) === void 0) {
      return [...pre, cur];
    }
  }, []);
}

//3
function removeDuplicates(arr) {
  const newArr = arr.slice();
  newArr.sort();
  let flag = '';
  const result = [];
  for (let item of newArr) {
    if (item !== flag) {
      result.push(item);
      flag = item;
    }
  }
  return result;
}

//4
function removeDuplicates(arr) {
  const result = [];
  for (let item of arr) {
    if (result.find((e) => e === item) === void 0) {
      result.push(item);
    }
  }
  return result;
}

//5
function removeDuplicates(arr) {
  const map = new Map();

  for (let item of arr) {
    map.set(item, true);
  }
  return Array.from(map.keys());
}
```

### 数组扁平化

#### 编写一个函数 flattenArray(arr)，接受一个可能包含嵌套数组的数组 arr，返回一个扁平化的新数组。请提供至少六种不同的方法来实现这一功能。

```js
// 递归方法
function flattenArray(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val),
    []
  );
}
// 迭代方法
function flattenArray(arr) {
  const result = [];
  const stack = [...arr];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  return result.reverse();
}
// 使用 ES6 flat() 方法：
function flattenArray(arr) {
  return arr.flat(Infinity);
}
// 使用 JSON.stringify 和 JSON.parse
function flattenArray(arr) {
  return JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
}
//
```

### 对象扁平化

#### 请实现函数 flattenObject(obj)，将嵌套对象 obj 扁平化为键使用点分隔符的对象，如 flattenObject({a: {b: {c: {dd: 'abcdd'}}, d: {xx: 'adxx'}, e: 'ae'}}}) 返回 {'a.b.c.dd': 'abcdd', 'a.d.xx': 'adxx', 'a.e': 'ae'}。

```js
function flat(obj, path = '', res = {}, isArray = false) {
  for (let [k, v] of Object.entries(obj)) {
    let newKey = isArray ? `${path}[${k}]` : `${path}${k}`;

    if (Array.isArray(v)) {
      flat(v, newKey, res, true);
    } else if (typeof v === 'object' && v !== null) {
      flat(v, `${newKey}.`, res, false);
    } else {
      res[newKey] = v;
    }
  }
  return res;
}
```

### 数字千分位分割

#### 编写一个函数 formatNumber(num)，接受一个数字 num，返回一个字符串，表示该数字的千分位分隔格式。示例：formatNumber(1234567) 应返回 "1,234,567"

```js
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

function formatNumber(num) {
  let numStr = num.toString();
  let [integerPart, decimalPart] = numStr.split('.');
  let result = '';
  let count = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    result = integerPart[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }

  if (decimalPart) {
    result += '.' + decimalPart;
  }

  return result;
}
```

### JS 下划线转驼峰处理

#### 实现一个函数 underscoreToCamelCase(str)，接受一个下划线分隔的字符串 str，将其转换为驼峰命名法。示例：underscoreToCamelCase("hello_world") 应返回 "helloWorld"。

```js
// 正则
function underscoreToCamelCase(str) {
  return str.replace(/_(.)/g, (_, char) => char.toUpperCase());
}
// 遍历
function underscoreToCamelCase(str) {
  return str
    .split('_')
    .map((word, index) => {
      if (index === 0) {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    })
    .join('');
}

console.log(underscoreToCamelCase('hello_world'));
```

### Hex 转 RGB 的方法

#### 请编写一个函数 hexToRgb(hex)，接受一个十六进制颜色字符串 hex，返回一个对象表示对应的 RGB 颜色值。示例：hexToRgb("#FFFFFF") 应返回 { r: 255, g: 255, b: 255 }。

```js
function hexToRgb(hex) {
  // 去掉前导井号并确保是 6 位
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('');
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}
```

### 实现模版字符串解析

#### 编写一个函数 parseTemplate(template, data)，接受一个字符串模板和一个对象数据 data，替换模板中的占位符为对象中的对应值。示例：parseTemplate("Hello, {name}!", { name: "Alice" }) 应返回 "Hello, Alice!"

```js
function parseTemplateString(templateString, data) {
  const regex = /\${(.*?)}/g;
  return templateString.replace(regex, (match, key) => {
    return data[key];
  });
}

const template = '你好，${name}！你今年 ${age} 岁。';
const data = { name: '小明', age: 18 };

const result = parseTemplateString(template, data);
console.log(result); // 输出: 你好，小明！你今年 18 岁。
```

### 数组转树形结构的三种方法

#### 实现一个函数 arrayToTree(arr)，接受一个扁平数组 arr，将其转换为树形结构。请提供至少三种不同的方法来实现这一功能。示例数组为：[{ id: 1, parentId: null }, { id: 2, parentId: 1 }, { id: 3, parentId: 1 }]，应返回相应的树形结构。

```js
function arrayToTree(list, rootId = 0) {
  return list
    .filter((l) => l.parent_id === rootId)
    .map((m) => ({
      ...m,
      children: arrayToTree(list, m.id),
    }));
}

function arrayToTree(list, rootId = 0) {
  const idMap = new Map();
  const result = [];

  list.forEach((l) => {
    idMap.set(l.id, { ...l, children: [] });
  });
  list.forEach((l) => {
    if (l.id === rootId) {
      result.push(l);
    } else {
      idMap.get(l.id).children.push(l);
    }
  });
  return result;
}
```

### 获取 URL 中的参数

#### 编写一个函数 getQueryParams(url)，接受一个 URL 字符串，返回一个对象表示该 URL 中的查询参数。示例：getQueryParams("https://example.com?page=1&size=10") 应返回 { page: "1", size: "10" }

```js
function getQueryParams(url) {
  // 确保输入的字符串有效
  if (!url) return {};

  // 使用 URL 对象来解析 URL
  const urlObj = new URL(url);
  const params = Object.fromEntries(urlObj.searchParams.entries());

  return params;
}

// 示例
const url = 'https://example.com?page=1&size=10&sort=asc';
const queryParams = getQueryParams(url);
console.log(queryParams); // 输出: { page: '1', size: '10', sort: 'asc' }
function getQueryParams(str) {
  const params = {};
  const regex = /[?&]([^=#]+)=([^&#]*)/g; // 兼容 & 和 ? 开头的参数
  let match;

  // 检查输入的有效性
  if (typeof str !== 'string' || !str.includes('?')) {
    return params; // 返回空对象
  }

  // 只匹配查询参数
  while ((match = regex.exec(str)) !== null) {
    const key = decodeURIComponent(match[1]); // 解码参数名
    const val = decodeURIComponent(match[2]); // 解码参数值
    params[key] = val;
  }

  return params;
}
```

### 请求并发控制

#### 你需要编写一个 JavaScript 函数来控制 API 请求的并发数量。该函数应该接受两个参数：urls：一个数组，包含若干个请求的 URL 字符串。maxConcurrency：一个整数，表示最多同时允许多少个请求并发执行。所有的 URL 请求将返回一个 Promise，请求应该在所有 Promise 完成后返回最终的结果，结果应该保持与输入 urls 顺序一致。请注意，你不能一次性发送所有请求，而是必须限制最多 maxConcurrency 个请求同时进行。

```js
async function limitedConcurrencyRequests(urls, maxConcurrency) {
  const results = new Array(urls.length); // 用于存储结果，确保结果顺序和输入 urls 顺序一致
  let currentIndex = 0; // 当前要请求的 URL 的索引
  let activeRequests = 0; // 当前正在执行的请求数量

  return new Promise((resolve, reject) => {
    // 启动下一个请求
    function startNextRequest() {
      // 如果当前正在执行的请求数量达到了最大并发数，或者已经请求完毕，直接返回
      if (activeRequests >= maxConcurrency || currentIndex >= urls.length)
        return;

      // 获取当前的索引并增加索引值，准备处理下一个 URL
      const index = currentIndex++;
      const url = urls[index];
      activeRequests++; // 增加并发请求计数

      // 执行请求
      fetch(url)
        .then((response) => response.json()) // 假设返回的是 JSON 数据
        .then((data) => {
          results[index] = data; // 保持结果的顺序
        })
        .catch((error) => {
          results[index] = { error: error.message }; // 记录错误信息
        })
        .finally(() => {
          activeRequests--; // 请求完成后减少并发请求计数
          if (currentIndex < urls.length) {
            startNextRequest(); // 继续下一个请求
          } else if (activeRequests === 0) {
            resolve(results); // 如果所有请求完成，返回最终结果
          }
        });

      // 继续启动新的请求，确保并发请求数不超过 maxConcurrency
      if (activeRequests < maxConcurrency && currentIndex < urls.length) {
        startNextRequest();
      }
    }

    // 初始化启动第一个请求
    for (let i = 0; i < maxConcurrency && i < urls.length; i++) {
      startNextRequest();
    }
  });
}

// 使用示例
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3',
  'https://api.example.com/data4',
];

limitedConcurrencyRequests(urls, 2).then((results) => {
  console.log(results);
});
```

### 并发请求加重试控制

#### 假设你正在开发一个图片下载应用，用户提交了一组图片的 URL，并希望一次性下载这些图片。为了避免网络拥堵或服务器拒绝请求，你需要限制同时进行的请求数量，并确保所有图片下载成功。如果某个请求失败，你需要重新尝试该请求至多 3 次，超过 3 次则记录该图片下载失败。

#### 请根据以下要求完成任务：

```js
// 1. 限制同时进行的请求数为 maxConcurrency（参数可由用户指定，默认是 5）。
// 2. 在一个请求完成后，立即启动下一个请求，直到所有图片都请求完毕。
// 3. 如果某个请求失败，最多重新尝试 3 次，仍然失败则记录错误，不再尝试。
// 4. 最终返回一个结果数组，包含每个图片的下载状态（成功或失败）。
async function downloadImages(pics, maxConcurrency = 5) {
  // 记录每个图片的下载结果
  const results = [];
  let idx = 0;

  // 最大尝试次数
  const maxRetry = 3;

  // 封装下载逻辑，并处理重试机制
  async function downloadWithRetry(url, attempt = 1) {
    try {
      // 模拟 fetch 请求下载图片
      await fetch(url);
      return { url, status: 'success' };
    } catch (error) {
      if (attempt < maxRetry) {
        // 如果请求失败并且尝试次数小于最大重试次数，递归调用
        console.log(`Retrying ${url}... Attempt ${attempt + 1}`);
        return downloadWithRetry(url, attempt + 1);
      } else {
        // 超过最大重试次数，返回失败
        return { url, status: 'failed' };
      }
    }
  }

  // 控制并发下载的函数
  async function handleDownload() {
    while (idx < pics.length) {
      const currentIdx = idx++;
      const result = await downloadWithRetry(pics[currentIdx]);
      results.push(result);
    }
  }

  // 创建并发任务池
  const concurrencyPool = [];
  for (let i = 0; i < maxConcurrency; i++) {
    concurrencyPool.push(handleDownload());
  }

  // 等待所有并发任务完成
  await Promise.all(concurrencyPool);

  // 返回下载结果
  return results;
}

// 测试
const pics = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
  'https://example.com/image4.jpg',
  'https://example.com/image5.jpg',
  'https://example.com/image6.jpg',
];

// 模拟 fetch 方法
async function fetch(url) {
  if (Math.random() < 0.7) {
    return Promise.resolve(); // 70% 成功率
  } else {
    return Promise.reject(); // 30% 失败率
  }
}

downloadImages(pics, 3).then((results) => console.log(results));
```

### 请求并发控制

```js
// 实现要求：
// 编写一个函数，限制同时发出的请求数量。
// 当并发的请求达到最大数量时，后续的请求需要排队等待，直到有请求完成。
// 使用fetch发送请求。
async function controlsMaxRequest(urls, maxCount) {
  let idx = 0;
  const results = new Array(urls.length);

  // 使用一个函数来获取索引，避免并发冲突
  const getNextIndex = () => {
    if (idx < urls.length) {
      return idx++;
    } else {
      return null;
    }
  };

  const handleRequest = async () => {
    while (true) {
      const index = getNextIndex();
      if (index === null) break;

      try {
        const result = await fetch(urls[index]);
        results[index] = result;
      } catch (error) {
        results[index] = error;
      }
    }
  };

  // 创建并发的Promise
  const promises = [];
  for (let i = 0; i < maxCount; i++) {
    promises.push(handleRequest());
  }

  // 等待所有任务完成
  await Promise.all(promises);
  return results;
}
```

### 带并发限制的 Promise 异步调度器

```js
// 实现要求：
// 实现一个任务调度器，限制最大并发数。
// 任务队列中的任务只能在有空闲线程时执行。
// 每个任务返回Promise，任务完成后继续执行队列中的任务。
class TaskPool {
  constructor(max) {
    this.tasks = []; // 任务队列
    this.pool = []; // 正在执行的任务
    this.max = max; // 最大并发数
  }

  addTask(task) {
    this.tasks.push(task);
    this.run(); // 添加任务后立即尝试运行任务
  }

  run() {
    if (this.tasks.length === 0) {
      return; // 如果没有任务，直接返回
    }

    const min = Math.min(this.tasks.length, this.max - this.pool.length); // 计算可以执行的任务数量
    for (let i = 0; i < min; i++) {
      const currTask = this.tasks.shift(); // 从任务队列中取出一个任务
      this.pool.push(currTask); // 将任务加入任务池表示正在执行

      currTask().finally(() => {
        this.pool.splice(this.pool.indexOf(currTask), 1); // 任务完成后从池中移除
        this.run(); // 尝试运行下一个任务
      });
    }
  }
}
const pool = new TaskPool(3);

function createTask(id, delay) {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Task ${id} finished`);
        resolve();
      }, delay);
    });
}

pool.addTask(createTask(1, 1000));
pool.addTask(createTask(2, 500));
pool.addTask(createTask(3, 1500));
pool.addTask(createTask(4, 700));
pool.addTask(createTask(5, 1200));
```

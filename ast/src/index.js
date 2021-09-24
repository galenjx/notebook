
// 1，寻找字符串中连续重复次数最多的字符
const str = 'aaaaaaaabbbbbbbbbbbbbbbbbcccccccccdddddd'
function getRepeat(str) {
    if (!str) return
    let maxTimes = 0,
        maxChar = str[0],
        start = 0,
        end = 0

    while (start < str.length) {
        // 不相等，说明字符不连续了，
        if (str[start] != str[end]) {
            if (end - start > maxTimes) {
                maxTimes = end - start
                maxChar = str[start]
            }
            start = end
        }
        // 相等，继续移动指针
        end++
    }

    return {
        maxTimes,
        maxChar
    }


}

// console.log(getRepeat(str))



// 2，用递归的方法输出斐波那契数列前 10 项
function fib(n) {
    // 缓存数据，避免重复计算
    const cache = {}
    function fn(index) {
        if (cache[index]) return cache[index]
        else {
            cache[index] = (index == 1 || index == 0) ? 1 : fn(index - 1) + fn(index - 2)
            return cache[index]
        }
    }
    for (let index = 0; index < n; index++) {
        console.log(fn(index))

    }
}
// fib(10)

// 3，格式转换
function convert(item) {
    if (typeof item === 'number') {
        return {
            value: item
        }
    }
    if (Array.isArray(item)) {
        return {
            children: item.map(val => convert(val))
        }
    }
}
let item = [1, 2, 3, [4, 5, [6, 7]], 8]


// 4.格式转换2
function smartRepeat(str){
    let i = 0,
    // 剩余的字符串
    resStr = str,
    // 存放数字的栈
    stackNum = [],
    // 存放字符串的栈
    stackStr = [],
    // 数字+[
    regExpStsrt = /^(\d+)\[/,
    // 字母 + ]
    regExpEnd = /^(\w+)\]/;

    while(i < str.length - 1){
        // 最新的剩余字符串
        resStr = str.substring(i)
        // 数字连着【开头
        if(regExpStsrt.test(resStr)) {
            let num = resStr.match(regExpStsrt)[1]
            // 对应数字入栈（每个数字对应的字符串也存起来）
            stackNum.push(num)
            stackStr.push('')
            // 移动指针，直接移过【
            i += num.length + 1
        }else if(regExpEnd.test(resStr)) {
            const str = resStr.match(regExpEnd)[1]
            // 将字符串栈的栈顶的那一项赋值为捕获的字母
            stackStr[stackStr.length - 1] = str
            // 直接跳过字母的长度
            i += str.length
        }else if(resStr[0] == ']') {
            // 对应数字出栈
            const popNum = stackNum.pop()
            const popStr = stackStr.pop()
            // 字符串拼接
            stackStr[stackStr.length - 1] += popStr.repeat(popNum)
            i++
        }
    }
    return stackStr[0].repeat(stackNum[0])
}
// console.log(smartRepeat('2[2[cwa]1[d]]'))

// 5.AST
import parseAttrs from './parseAttrs.js'

 function parse(templateStr) {
  // 准备一个指针
  let i = 0
  // 准备两个栈
  // 初始添加元素 { children: [] } 是因为如果不加， stackContent 在遇到最后一个封闭标签进行弹栈后，stackContent 里就没有元素了，也没有 .children 可以去 push 了
  const stackTag = [], stackContent = [{ children: [] }] 
  // 指针所指位置为开头的剩余字符串
  let restTemplateStr = templateStr
  // 识别开始标签的正则
  const regExpStart = /^<([a-z]+[1-6]?)(\s?[^>]*)>/

 while (i < templateStr.length - 1) {
  restTemplateStr = templateStr.substring(i)
  // 遇到开始标签
  if (regExpStart.test(restTemplateStr)) {
    const startTag = restTemplateStr.match(regExpStart)[1] // 标签
    const attrsStr = restTemplateStr.match(regExpStart)[2] // 属性
    console.log(startTag,attrsStr)
    // 标签栈进行压栈
    // stackTag.push(startTag)
    // 内容栈进行压栈
    stackContent.push({
      tag: startTag,
      attrs: parseAttrs(attrsStr),
      type: 1,
      children: []
    })
    i += startTag.length + attrsStr.length  + 2 // +2 是因为还要算上 < 和 >
  } else if (/^<\/[a-z]+[1-6]?>/.test(restTemplateStr)) { // 遇到结束标签
    const endTag = restTemplateStr.match(/^<\/([a-z]+[1-6]?)>/)[1]
    // 结束标签应该与标签栈的栈顶标签一致
    if (endTag === stackContent[stackContent.length -1].tag) {
      // 两个栈都进行弹栈
    //   stackContent.pop()
      const popContent = stackContent.pop()
      stackContent[stackContent.length - 1].children.push(popContent)
      i += endTag.length + 3 // +3 是因为还要算上 </ 和 >
    } else {
      throw Error('标签' + stackContent[stackContent.length -1].tag + '没有闭合')
    }
  } else if (/^[^<]+<\/[a-z]+[1-6]?>/.test(restTemplateStr)) { // 遇到内容
    const wordStr = restTemplateStr.match(/^([^<]+)<\/[a-z]+[1-6]?>/)[1] // 捕获结束标签 </> 之前的内容，并且不能包括开始标签 <>
    if (!/^\s+$/.test(wordStr)) { // 如果捕获的内容不为空
      // 将内容栈栈顶元素进行赋值
      stackContent[stackContent.length - 1].children.push({
        text: wordStr,
        type: 3
      })
    }
    i += wordStr.length
  } else {
    i++
  }
 }
 // 因为定义 stackContent 的时候就默认添加了一项元素 { children: [] }，现在只要返回 children 的第一项就行 
 return stackContent[0].children[0]
}

const templateStr = `<div>
  <h3 id="legend" class="jay song">范特西</h3>
  <ul>
    <li>七里香</li>
  </ul>
</div>`

const ast = parse(templateStr)
console.log(JSON.stringify(ast))

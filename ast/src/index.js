
// 寻找字符串中连续重复次数最多的字符
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
console.log(smartRepeat('2[2[cwa]1[d]]'))
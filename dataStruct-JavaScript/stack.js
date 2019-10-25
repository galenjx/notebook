
// 封装栈类
function Stack(){
    // 栈内元素用数组存储
    this.items = []

    //1.进栈(给整个类添加方法的方式，在new实例时节省空间)
    Stack.prototype.push = function(ele){
        this.items.push(ele)
    } 
    //2.出栈
    Stack.prototype.pop = function(){
        return this.items.pop()
    }
    //3.查看栈顶元素
    Stack.prototype.peak = function(){
        return this.items[this.items.length - 1]
    }
    //4.判断栈是否为空
    Stack.prototype.isEmpty = function(){
        return this.items.length === 0
    }
    //5.获取栈大小
    Stack.prototype.size = function(){
        return this.items.length
    }
    //6.转字符串
    Stack.prototype.toString = function(){
        return this.items.join('')
    }
    //...

}

//测试
let s = new Stack()
s.push('1')
s.push('2')
s.push('4')
console.log(s)
console.log(s.size()) 
console.log(s.isEmpty()) 
console.log(s.toString()) 
console.log(s.peak()) 
console.log(s.pop()) 

//应用：十进制转二进制（除二取余）
function decTobin(decNumber){
    let stack = new Stack()
    while(decNumber > 0){
        stack.push(decNumber % 2)
        decNumber = Math.floor(decNumber / 2)
    }
    let bin = ''
    while(!stack.isEmpty()){
        bin += stack.pop()
    }
    return bin
}
console.log(decTobin(10))
console.log(decTobin(39))
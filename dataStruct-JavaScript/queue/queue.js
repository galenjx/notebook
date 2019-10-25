//封装队列的类
function Queue(){
    //以数组的方式存储
    this.items = []
    //封装一些常用的方法
    //1.在前端插入一个元素
    Queue.prototype.enqueue = function(ele){
        this.items.push(ele)
    }
    //2.在后端删除一个元素(这里使用数组的方式存储，性能不高)
    Queue.prototype.dequeue = function(){
        return this.items.shift();
    }
    //3.查看前端元素
    Queue.prototype.front = function(){
        return this.items[0]
    }
    //4.判断队列是否为空
    Queue.prototype.isEmpty = function(){
        return this.items.length === 0
    }
    //5.获取队列大小
    Queue.prototype.size = function(){
        return this.items.length
    }
    //6.转字符串
    Queue.prototype.toString = function(){
        return this.items.join('')
    }
    //...

}

//test
let q = new Queue()
console.log(q.isEmpty())
q.enqueue('a')
q.enqueue('e')
q.enqueue('r')
q.enqueue('g')
console.log(q.front())
console.log(q.isEmpty())
console.log(q.size())
console.log(q.toString())
console.log(q.dequeue())
console.log(q)


//应用：击鼓传花
function passGame(list, num){
    let queue = new Queue()
    for(let i = 0; i < list.length;i++){
        queue.enqueue(list[i])
    }
    while(queue.size() > 1){
        for(let i = 0;i < num - 1;i++){
            //未到对应编号的人，排到后面
            queue.enqueue(queue.dequeue())
        }
        //数到对应编号的人，出局
        queue.dequeue()
    }
    // console.log(queue.front(),queue.size())
    return list.indexOf(queue.front())
}
console.log(passGame(['a','b'],5))
console.log(passGame(['a','b','c'],5))
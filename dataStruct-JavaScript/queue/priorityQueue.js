//封装优先级队列
function PriorityQueue(){
    this.items = []
    //优先级的类
    function QueueEle(ele,priority){
        this.ele = ele
        this.priority = priority
    }
    //插入元素(传入优先级)
    PriorityQueue.prototype.enqueue = function(ele,priority){
        let queueEle = new QueueEle(ele,priority)
        if(this.items.length === 0){
            this.items.push(queueEle)
        }else{
            let flag = false
            let len = this.items.length
            for(let i = 0;i < len;i++){
                if(queueEle.priority < this.items[i].priority){
                    this.items.splice(i,0,queueEle)
                    flag = true
                    //既然找到了，就没必要继续了
                    break
                }
            }
            //如果没有找到优先级比他大的直接放到后端
            if(!flag){
                this.items.push(queueEle)
            }
        }
    }
    //2.在后端删除一个元素(这里使用数组的方式存储，性能不高)
    PriorityQueue.prototype.dequeue = function(){
        return this.items.shift();
    }
    //3.查看前端元素
    PriorityQueue.prototype.front = function(){
        return this.items[0]
    }
    //4.判断队列是否为空
    PriorityQueue.prototype.isEmpty = function(){
        return this.items.length === 0
    }
    //5.获取队列大小
    PriorityQueue.prototype.size = function(){
        return this.items.length
    }
    //6.转字符串
    PriorityQueue.prototype.toString = function(){
        return this.items.join('')
    }
    //...

}

//test
let priorityQueue = new PriorityQueue()
priorityQueue.enqueue('lili',10)
priorityQueue.enqueue('gaga',11)
priorityQueue.enqueue('wawa',1)
priorityQueue.enqueue('xixi',111)
console.log(priorityQueue)
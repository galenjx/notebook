//链表的类
function LinkedList () {
    //节点的类
    function Node (data) {
        this.data = data
        this.next = null
    }
    //属性
    this.header = null
    this.length = 0
    //1.增
    //尾部增加
    LinkedList.prototype.append = function (data) {
        let node = new Node(data)
        //是第一个节点
        if(!this.header){
            this.header = node
        //不是第一个节点，找到最后一个节点
        }else{
            let current = this.header
            while(current.next){
                current = current.next
            }
            //current的指向为空（最后一个节点），让他指向node
            current.next = node
        }
        this.length += 1
    }
    //特定位置增加
    LinkedList.prototype.insert = function (data, position) {
        //越界
        if(position < 0 || position > this.length) return false

        let node = new Node(data)
        if(this.length === 0){
            node.next = this.header
            this.header = node
        }else{
            let index = 0
            let current = this.header
            let previous = null
            //position与元素‘索引’对应
            while(index++ < position){
                previous = current
                current = current.next
            }
            //找出相应的位置，改变指针指向
            node.next = current
            previous.next = node
        }
        this.length += 1
        return true
    }


    //2.删除
    //某个元素
    LinkedList.prototype.remove = function (data) {
        let position = this.indexOf(data)
        return this.removeAt(position)
    }
    //特定位置
    LinkedList.prototype.removeAt = function (position) {
        if(position < 0 || position >= this.length) return null
        let current = this.header
        let previous = null
        let index = 0
        if(position === 0){
            this.header = current.next
        }else{
            while(index++ < position){
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        this.length -= 1
        return current.data
    }
    //3.更新
    LinkedList.prototype.update = function (data,position) {
        if(position < 0 || position >= this.length) return false
        let current = this.header
        let index = 0
        while(current){
            if((index++) === position){
                current.data = data
                return true
            }
            current = current.next
        }
    }
    //4.查
    //索引
    LinkedList.prototype.indexOf = function (data) {
        let current = this.header
        let index = 0
        while(current){
            if(current.data === data) return index
            current = current.next
            index++
        }
        //没有找到
        return -1
    }
    //元素
    LinkedList.prototype.get = function (position) {
        if(position < 0 || position >= this.length) return null
        let current = this.header
        let index = 0
        while(index++ < position){
            current = current.next
        }
        return current.data

    }
    //5.tostring
    LinkedList.prototype.toString = function () {

        let current = this.header

        let LinkedListString = ''

        while(current){
            LinkedListString += current.data + ' '
            current = current.next
        }

        return LinkedListString
    }
    //6.isEmpty
    LinkedList.prototype.isEmpty = function () {
        return this.length === 0
    }
    //7.size
    LinkedList.prototype.size = function () {
        return this.length
    }
}


//test
let linkedList = new LinkedList()

linkedList.append('aaa')
linkedList.append('bbb')
linkedList.append('ccc')
linkedList.append('ddd')
console.log(linkedList.toString())

linkedList.insert('eee',2)
console.log(linkedList.toString())

console.log(linkedList.get(2))

console.log(linkedList.indexOf('ddd'))

linkedList.update('galen',3)
console.log(linkedList.toString())

console.log(linkedList.removeAt(2))
console.log(linkedList.toString())


console.log(linkedList.remove('bbb'))
console.log(linkedList.toString())

console.log(linkedList.isEmpty())
console.log(linkedList.size())
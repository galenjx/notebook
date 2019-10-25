//封装双向链表的类
function DoublyLinkedList () {
    //属性
    this.header = null
    this.tail = null
    this.length = 0
    //节点的类
    function Node (data) {
        this.data = data
        this.prev = null
        this.next = null
    }
    //方法
    //1.增
    //尾部增加
    DoublyLinkedList.prototype.append = function (data) {
       let node = new Node(data)
       if(this.length === 0){
           this.header = node
           this.tail = node
       }else{
           node.prev = this.tail
           this.tail.next = node
           this.tail = node
       }
       this.length += 1
    }
    //特定位置增加
    DoublyLinkedList.prototype.insert = function (data, position) {
        if(position < 0 || position > this.length) return false
        let node = new Node(data)

        if(this.length === 0){
            this.header = node
            this.tail = node

        }else{
            if(position === 0){
                this.header.prev = node
                node.next = this.header
                this.header = node
            //相当于append
            }else if(position === this.length){
                node.prev = this.tail
                this.tail.next = node
                this.tail = node

            }else{
                let current = this.header
                let index = 0
                //找到对应元素
                while(index++ < position){
                    current = current.next
                }
                node.prev = current.prev
                node.next = current
                current.prev.next = node
                current.prev = node
            }
        }
        this.length += 1
        return true
    }


    //2.删除
    //某个元素
    DoublyLinkedList.prototype.remove = function (data) {
        let position = this.indexOf(data)
        return this.removeAt(position)
    }
    //特定位置
    DoublyLinkedList.prototype.removeAt = function (position) {
        if(position < 0 || position >= this.length) return null
        let current = this.header
        if(this.length === 1){
            this.header = null
            this.tail = null
        }else{
            if(position === 0){
                this.header.next.prev = this.header
                this.header = this.header.next
            }else if(position === this.length - 1){
                //用于后续返回
                current = this.tail
                this.tail.prev.next = null
                this.tail = this.tail.prev
            }else{
                //先做判断提高查找效率
                if(this.length/2 > position){
                    let index = 0
                    while(index++ < position){
                        current = current.next
                    }
                    current.prev.next = current.next
                    current.next.prev = current.prev
                }else{
                    let index = this.length - 1
                    current = this.tail
                    while(index-- > position){
                        current = current.prev
                    }
                    current.prev.next = current.next
                    current.next.prev = current.prev
                }
            }
        }
        this.length--
        return current.data
    }
    //3.更新
    DoublyLinkedList.prototype.update = function (data,position) {
        if(position < 0 || position >= this.length) return false
        //先做判断提高查找效率
        if(this.length/2 > position){
            let current = this.header
            let index = 0
            while(index++ < position){
                current = current.next
            }
            current.data = data
            return true
        }else{
            let current = this.tail
            let index = this.length - 1
            while(index-- > position){
                current = current.prev
            }
            current.data = data
            return true
        }
    }
    //4.查
    //索引
    DoublyLinkedList.prototype.indexOf = function (data) {
        let current = this.header
        let index = 0
        while(current){
            if(current.data === data) return index
            current  = current.next
            index++
        }
        return -1
    }
    //元素
    DoublyLinkedList.prototype.get = function (position) {
        if(position < 0 || position >= this.length) return null
        //先做判断提高查找效率
        if(this.length/2 > position){
            let current = this.header
            let index = 0
            while(index++ < position){
                current = current.next
            }
            return current.data
        }else{
            let current = this.tail
            let index = this.length - 1
            while(index-- > position){
                current = current.prev
            }
            return current.data
        }
        
    }
    //5.tostring
    DoublyLinkedList.prototype.toString = function () {
        return this.backwardString()
    }
    //6.forwardString
    DoublyLinkedList.prototype.forwardString = function () {
        let current = this.tail
        let forString = ''
        while(current){
            forString += current.data + ' '
            current = current.prev
        }
        return forString
    }
    //7.backwardString
    DoublyLinkedList.prototype.backwardString = function () {
        let current = this.header
        let backString = ''
        while(current){
            backString += current.data + ' '
            current = current.next
        }
        return backString
    }
    //8.isEmpty
    DoublyLinkedList.prototype.isEmpty = function () {
        return this.length === 0
    }
    //9.size
    DoublyLinkedList.prototype.size = function () {
        return this.length
    }
    //10.getHeader
    DoublyLinkedList.prototype.getHeader = function () {
        return this.header.data
    }
    //11.getTail
    DoublyLinkedList.prototype.getTail = function () {
        return this.tail.data
    }
    
}

//test
let doublyLinkedList =new DoublyLinkedList ()

doublyLinkedList.append('aaa')
doublyLinkedList.append('bbb')
doublyLinkedList.append('ccc')
console.log(doublyLinkedList.toString())
// console.log(doublyLinkedList.forwardString())

console.log(doublyLinkedList.insert('galen',2))
console.log(doublyLinkedList.length)
console.log(doublyLinkedList.toString())


console.log(doublyLinkedList.get(2))


console.log(doublyLinkedList.indexOf('galen'))
console.log(doublyLinkedList.indexOf('gale'))

console.log(doublyLinkedList.update('galenn',3))
console.log(doublyLinkedList.toString())

console.log(doublyLinkedList.removeAt(0))
console.log(doublyLinkedList.toString())

console.log(doublyLinkedList.remove('galen'))
console.log(doublyLinkedList.toString())
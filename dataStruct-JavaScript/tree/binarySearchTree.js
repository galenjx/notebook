//封装二叉搜索树的类
function BinarySearchTree () {

    //1.节点的类
    function Node (key) {
        this.key = key
        this.left = null
        this.right = null
    }

    //2.属性
    this.root = null

    //3.方法  1.插入（暴露给外面的插入）
    BinarySearchTree.prototype.insert = function (key) {
        let node = new Node(key)
        if(this.root === null){//没有根节点
            this.root = node
        }else{//有根节点
            this.innerInsert(this.root, node)
        }
    }
    
    //插入（内部调用）
    BinarySearchTree.prototype.innerInsert = function (node, newNode) {
        //1.比较放到右边还是左边
        if(node.key > newNode.key){
            //2.左边没有
            if(node.left === null){
                node.left = newNode
            //3.左边有节点，继续调用...
            }else{
                this.innerInsert(node.left, newNode)
            }
        }else{
            if(node.right === null){
                node.right = newNode
            }else{
                this.innerInsert(node.right, newNode)
            }
        }
    }

    //2.遍历
    // 先序遍历（root -> left -> right）
    BinarySearchTree.prototype.preOrderTraversal = function (handler) {
        this.innerPreOrderTraversal(this.root, handler)
    }
    //内部使用先序遍历
    BinarySearchTree.prototype.innerPreOrderTraversal = function (node, handler) {
        if(node !== null){

            //处理当前节点
            handler(node.key)

            //处理左子节点
            this.innerPreOrderTraversal(node.left, handler)

            //处理右子节点
           this.innerPreOrderTraversal(node.right, handler)
        }
    }

    //中序遍历
    BinarySearchTree.prototype.midOrderTraversal = function (handler) {
        this.innerMidOrderTraversal(this.root, handler)
    }
    //中序遍历内部方法
    BinarySearchTree.prototype.innerMidOrderTraversal = function (node, handler) {
        if(node !== null){

            //处理左子树
            this.innerMidOrderTraversal(node.left, handler)

            //处理节点
            handler(node.key)

            //处理右子树
            this.innerMidOrderTraversal(node.right, handler)
        }
    }

    //后序遍历
    BinarySearchTree.prototype.backOrderTraversal = function (handler) {
        this.innerBackOrderTraversal(this.root, handler)
    }
    //后序遍历内部方法
    BinarySearchTree.prototype.innerBackOrderTraversal = function (node, handler) {
        if(node !== null){

            //处理左子树
            this.innerBackOrderTraversal(node.left, handler)

            //处理右子树
            this.innerBackOrderTraversal(node.right, handler)

            //处理节点
            handler(node.key)
        }
    }

    //3.最大值
    BinarySearchTree.prototype.getMax = function () {
        let node = this.root
        while(node.right !== null){
            node = node.right
        }
        return node.key
    }

    //4.最小值
    BinarySearchTree.prototype.getMin = function () {
        let node = this.root
        while(node.left !== null){
            node = node.left
        }
        return node.key
    }

    //5.搜索
    BinarySearchTree.prototype.search = function (key) {
        let node = this.root

        //循环查找
        while(node !== null){
            if(node.key > key){
                node = node.left
            }else if(node.key < key){
                node = node.right
            }else{
                return true
            }
        }

        //没有找到
        return false
    }

    //6.删除节点⭐
    BinarySearchTree.prototype.remove = function (key) {

        // 1.定义一些变量，保存节点信息
        let current = this.root
        let parent = null
        let isLeftChild = true

        //2.找到相应的节点
        while (current.key !== key) {
            parent = current
            if (current.key > key) {
                isLeftChild = true
                current = current.left
            }else {
                isLeftChild = false
                current = current.right
            }

            //没有找到
            if (current === null) return false
        }

        //3.这里已经找到了
        // 3.1,是叶子节点
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null
            }else if (isLeftChild) {
                parent.left = null
            }else {
                parent.right = null
            }
        }

        //3.2，只有一个子节点
        //判断当前节点的左右
        else if (current.right === null) {
            if (current === this.root) {//是父节点额外讨论
                this.root = current
            }else if (isLeftChild) {//判断是父节点的左右
                parent.left = current.left
            }else{
                parent.right = current.left
            }
        }else if (current.left === null) {
            if(current === this.root) {
                this.root = current
            }else if (isLeftChild) {
                parent.left = current.right
            }else {
                parent.right = current.right
            }
        }

        //3.3有两个子节点
        else {

            //获取后继节点并行相关操作(处理successor右边的关系)
            let successor = this.getSuccessor(current)

            //处理处理successor左边与parent的关系
            if (current === this.root) {
                this.root = successor
            }else if (isLeftChild) {
                parent.left = successor
            }else {
                parent.right = successor
            }
            successor.left = current.left
        }
    }

    //寻找后继
    BinarySearchTree.prototype.getSuccessor = function (node) {

        //后继节点
        let successor = node.right
        let successorParent = node
        while (successor.left !== null) {
            successorParent = successor
            successor = successor.left
        }
        if (successor !== node.right) {
            successorParent.left = successor.right
            successor.right = node.right
        }
        return successor
    }
}


//test
let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)
bst.insert(19)

//先序遍历
let respre = ''
bst.preOrderTraversal(function (key) {
    respre += key + ' '
})
console.log(respre)//11 7 5 3 9 8 10 15 13

//中序遍历
let resmin = ''
bst.midOrderTraversal(function (key) {
    resmin += key + ' '
})
console.log(resmin)//3 5 7 8 9 10 11 13 15

//后序遍历
let res = ''
bst.backOrderTraversal(function (key) {
    res += key + ' '
})
console.log(res)//3 5 8 10 9 7 13 15 11

// console.log(bst.getMax())
// console.log(bst.getMin())


// console.log(bst.search(8))
// console.log(bst.search(667))



bst.remove(9)
bst.remove(15)
let resre = ''
bst.backOrderTraversal(function (key) {
    resre += key + ' '
})
console.log(resre)//3 5 8 10 9 7 13 15 11
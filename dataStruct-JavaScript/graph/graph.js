const Map = require('../set,map,hash/map')
const Queue = require('../queue/queue')
//图的类
function Graph () {

    //用数组存储点
    this.vertexes = []
    //用字典存储边
    this.edges = new Map()

    //方法
    //1.添加顶点的方法
    Graph.prototype.addVertex = function (v) {
        this.vertexes.push(v)
        this.edges.add([],v)
    }

    //2.添加边方法
    Graph.prototype.addEdge = function (v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }

    //3.tostring
    Graph.prototype.toString = function () {
        let res = ''
        for (let i = 0; i < this.vertexes.length; i++) {
            res += this.vertexes[i] + '->'
            let edge = this.edges.get(this.vertexes[i])
            for (let j = 0; j < edge.length; j++) {
                res += edge[j] + ' '
            }
            res += '\n'
        }
        return res
    }

    //初始化颜色
    Graph.prototype.initColor = function () {
        let colors = []
        for (let i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = 'white'
        }
        return colors
    }

    //4.广度优先搜索
    Graph.prototype.bfs = function (v, handler) {
        // 1.初始化颜色
        let color = this.initColor()
    
        // 2.创建队列
        let queue = new Queue()
    
        // 3.将传入的顶点放入队列中
        queue.enqueue(v)
    
        // 4.从队列中依次取出和放入数据
        while (!queue.isEmpty()) {
            // 4.1.从队列中取出数据
            let v = queue.dequeue()
    
            // 4.2.获取v相邻的所有顶点
            let vList = this.edges.get(v)
    
            // 4.3.v被访问过，将v的颜色设置成灰色
            color[v] = "gray"
    
            // 4.4.将vList的所有顶点依次压入队列中
            for (let i = 0; i < vList.length; i++) {
                let a = vList[i]
                if (color[a] === "white") {//避免重复压进去
                    color[a] = "gray"
                    queue.enqueue(a)
                }
            }

            // 4.5.处理v
            if (handler) {
                handler(v)
            }

            // 4.6.因为v已处理过， 将v设置成黑色
            color[v] = "black"
    
        }
    }

    //深度优先遍历
    // 深度优先搜索
    Graph.prototype.dfs = function (handler) {
        // 1.初始化颜色
        var color = this.initColor()

        // 2.遍历所有的顶点, 开始访问
        for (var i = 0; i < this.vertexes.length; i++) {
            if (color[this.vertexes[i]] === "white") {
                this.dfsVisit(this.vertexes[i], color, handler)
            }
        }
    }

    // dfs的递归调用方法
    Graph.prototype.dfsVisit = function (v, color, handler) {
        // 1.将u的颜色设置为灰色
        color[v] = "gray"

        // 2.处理u顶点
        if (handler) {
            handler(v)
        }

        // 3.u的所有邻接顶点的访问
        var vList = this.edges.get(v)
        for (var i = 0; i < vList.length; i++) {
            var w = vList[i]
            if (color[w] === "white") {
                this.dfsVisit(w, color, handler)
            }
        }

        // 4.将u设置为黑色
        color[v] = "black"
    }
    

}



//test
let graph = new Graph()
let myv = ['A','B','C','D','E','F','G','H','I']
for (let i = 0; i < myv.length; i++) {
    graph.addVertex(myv[i])
}
console.log(graph.vertexes)

graph.addEdge('A','B')
graph.addEdge('A','C')
graph.addEdge('A','D')
graph.addEdge('C','D')
graph.addEdge('C','G')
graph.addEdge('D','G')
graph.addEdge('D','H')
graph.addEdge('B','E')
graph.addEdge('B','F')
graph.addEdge('E','I')
console.log(graph.edges)
console.log(graph.toString())

// console.log(graph.initColor())

// 调用广度优先算法
// let result = ""
// graph.bfs(graph.vertexes[0], function (v) {
//     result += v + " "
// })
// console.log(result) // A B C D E F G H I 



let result = ""
graph.dfs(function (v) {
    result += v + " "
})
console.log(result) // A B C D E F G H I 
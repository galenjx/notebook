//封装字典的类（其实就是es6的）
function Map () {
    //用对象存
    this.items = {}
    //方法1.添加
    Map.prototype.add = function (value,key) {
        this.items[key] = value
    }
    //2.是否存在
    Map.prototype.has = function (key) {
        return this.items.hasOwnProperty(key)
    }
    //3.删除
    Map.prototype.remove = function (key) {
        if(!this.has(key)) return false
        delete this.items[key]
        return true
    }
    Map.prototype.get = function (key) {
        return this.has(key) ? this.items[key] : undefined
    }
    //4。清除
    Map.prototype.clear = function () {
        this.items = {}
    }
    // 5.长度
    Map.prototype.size = function () {
        return this.keys().length
    }
    //6.所有的键
    Map.prototype.keys = function () {
        return Object.keys(this.items)
    }
    //7.所有的值
    Map.prototype.values = function () {
        return Object.values(this.items)
    }
    //...
}

module.exports = Map
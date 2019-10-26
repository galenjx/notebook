//封装集合的类（其实就是es6的Set）
function Set () {
    //用对象存
    this.items = {}
    //方法1.添加
    Set.prototype.add = function (value) {
        if(this.has(value)) return false
        this.items[value] = value
        return true
    }
    //2.是否存在
    Set.prototype.has = function (value) {
        return this.items.hasOwnProperty(value)
    }
    //3.删除
    Set.prototype.remove = function (value) {
        if(!this.has(value)) return false
        delete this.items[value]
        return true
    }
    //4。清除
    Set.prototype.clear = function () {
        this.items = {}
    }
    // 5.长度
    Set.prototype.size = function () {
        return Object.keys(this.items).length
    }
    //6.所有的值
    Set.prototype.values = function () {
        return Object.keys(this.items)
    }
    //7.并集
    Set.prototype.union = function (otherSet) {
        let values = this.values()
        let unionSet = new Set()
        for(let i = 0;i < values.length;i++){
            unionSet.add(values[i])
        }
        let otherValues = otherSet.values()
        for(let i = 0;i < otherValues.length;i++){
            unionSet.add(otherValues[i])
        }
        return unionSet
    }
    // 8.交集
    Set.prototype.interSet = function (otherSet) {
        let interSet = new Set()
        let values = this.values()
        for(let i = 0;i < values.length;i++){
            let item = values[i]
            if(otherSet.has(item)){
                interSet.add(item)
            }
        }
        return interSet
    }
    //9.差集
    Set.prototype.different = function (otherSet) {
        let differentSet = new Set()
        let values = this.values()
        for(let i = 0;i < values.length;i++){
            let item = values[i]
            if(!otherSet.has(item)){
                differentSet.add(item)
            }
        }
        return differentSet
    }
    // 10.子集
    Set.prototype.sub = function (otherSet) {
        let values = otherSet.values()
        for(let i = 0;i < values.length;i++){
            if(!this.has(values[i])) return false
        }
        return true
    }
}


//test
let set = new Set()
console.log(set.add('aaa'))
console.log(set.add('aaa'))
console.log(set.add('bbb'))
console.log(set.add('ccc'))

console.log(set.values())

console.log(set.size())

console.log(set.remove('ccc'))
console.log(set.values())

// console.log(set.clear())
// console.log(set.values())

//并集
// let otherSet = new Set()
// console.log(otherSet.add('aaa'))
// console.log(otherSet.add('ddd'))
// console.log(otherSet.add('fff'))
// console.log(otherSet.union(set))

//交集
// let otherSet = new Set()
// console.log(otherSet.add('aaa'))
// console.log(otherSet.add('ddd'))
// console.log(otherSet.add('fff'))
// console.log(otherSet.interSet(set))

//差集
// let otherSet = new Set()
// console.log(otherSet.add('aaa'))
// console.log(otherSet.add('ddd'))
// console.log(otherSet.add('fff'))
// console.log(otherSet.different(set))

//子集
let otherSet = new Set()
console.log(otherSet.add('aaa'))
console.log(otherSet.add('bbb'))
console.log(otherSet.add('fff'))
console.log(otherSet.sub(set))
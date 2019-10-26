//哈希表的类
function HashTable () {
    this.storage = []

    //当前的数量
    this.count = 0

    //可以存的数量
    this.limit = 7

    //1.哈希函数
    // 把元素转成一个大的数字，hashcode
    //把hashcode转成size范围内的下表
    HashTable.prototype.hashFun = function (str, size) {
        let hashCode = 0
        let len = str.length
        for (let i = 0; i < len; i++) {

            //哈希算法：幂的连乘 -> 霍纳法制提取 -> hashcode=*** 
            //37为hash算法常用质数，charCodeAt获取的时unicode编码
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
        return hashCode % size
    }

    // 2.插入 or 修改
    HashTable.prototype.put = function (value, key) {

        //1.哈希算法拿到相应下标
        let index = this.hashFun(key, this.limit)
        let bucket = this.storage[index]

        //2.bucket是否为空
        if(bucket === undefined){
            bucket = []
            this.storage[index] = bucket
        }

        //3.里面是否存过相应元素,有则为修改操作
        for(let i = 0; i < bucket.length; i++){
            let tuble = bucket[i]
            if(tuble[0] === key){
                tuble[1] = value
                return
            }
        }

        //4.添加操作
        bucket.push([key,value])
        this.count += 1

        //5.是否需要扩容
        if(this.count > this.limit * 0.75){
            this.resize(this.getPrime(this.limit * 2))
        }
    }

    //3.获取操作
    HashTable.prototype.get = function (key) {

        //1.获取索引
        let index = this.hashFun(key,this.limit)

        //2.获取bucket
        let bucket = this.storage[index]

        //3.bucket是否为null
        if(bucket === undefined) return null

        //4.找到里面相应元素
        for(let i = 0; i < bucket.length; i++){
            let tuble = bucket[i]
            if(tuble[0] === key){
                return tuble[1]
            }
        }

        //5.没有找到
        return null
    }

    // 3.remove
    HashTable.prototype.remove = function (key) {

        //1.
        let index = this.hashFun(key, this.limit)

        //2.
        let bucket = this.storage[index]

        //3.
        if(bucket === undefined) return null

        //4.
        for(let i = 0; i < bucket.length; i++){
            let tuble = bucket[i]
            if(tuble[0] === key){
                bucket.splice(i,1)
                this.count -= 1

                //检查是否需要减少容量
                if(this.limit > 7 && this.count < this.limit * 0.25){
                    this.resize(this.getPrime(Math.floor(this.limit / 2)))
                }

                return tuble[1]
            }
        }

        //5.
        return null
    }

    // 4.是否为空
    HashTable.prototype.isEmpty = function () {
        return this.count === 0
    }

    //5.元素个数
    HashTable.prototype.size = function () {
        return this.count
    }

    //6.哈希表扩容,在增加元素时判断使用
    HashTable.prototype.resize = function (newLimit) {

        //1.存取旧的storage
        let oldStorage = this.storage

        //2.重置
        this.storage = []
        this.count = 0
        this.limit = newLimit

        //3.遍历所有元素，放进新srorage
        for(let i = 0; i < oldStorage.length; i++){
            let bucket = oldStorage[i]
            if(bucket === undefined){
                continue
            }
            for(let j = 0; j < bucket.length; j++){
                let tuble = bucket[j]
                this.storage.put(tuble[0],tuble[1])
            }
        }

    }
    //7.判断是否为质数,可以让数据分布均匀，防止聚集
    HashTable.prototype.isPrime = function (num) {

        //1.先做平方根
        let realSize = parseInt(Math.sqrt(num))
        for(let i = 0; i < realSize; i++){
            if(num % i === 0){
                return false
            }
        }
        return true
    }

    // 8.获取一个质数
    HashTable.prototype.getPrime = function (num) {
        while(!this.isPrime(num)){
            num++
        }
        return num
    }
}

//test
let hashTa = new HashTable()
hashTa.put('111','aaa')
hashTa.put('11','bbb')
hashTa.put('116','ccc')
hashTa.put('1q16','ccqc')
console.log(hashTa.get('ccqc'))

hashTa.put('112','aaa')
console.log(hashTa.get('aaa'))

hashTa.remove('aaa')
console.log(hashTa.get('aaa'))

console.log(hashTa.size())
console.log(hashTa.isEmpty())
// console.log(hashFun('aaa', 5))
// console.log(hashFun('abc', 5))
// console.log(hashFun('eee', 5))
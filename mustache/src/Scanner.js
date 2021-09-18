
export class Scanner {
    constructor(template) {
        this.template = template

        // 指针
        this.pos = 0
        // 尾部字符串
        this.tail = this.template
    }

    // 走过指定内容，比如{{}}
    scan(tag){
        if(this.tail.indexOf(tag) == 0) {
            this.pos += tag.length
            this.tail = this.template.substring(this.pos)
        }
    }

    // 扫过指定内容结束，并返回相应内容
    scanUntil(stopTag){
        // 记录初始位置，用于返回内容
        let startindex = this.pos
        // 找到指定内容
        while(this.tail.indexOf(stopTag) != 0 && this.tail) {
            this.pos++
            this.tail = this.template.substring(this.pos)
        }
        // 返回指定内容
        return this.template.substring(startindex,this.pos)
    }
}
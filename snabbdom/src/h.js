// return 的Vnode格式
export const vNode = (sel, data, children, text, elm, key) => {
    return {
        sel, data, children, text, elm, key
    }
}

// 判断是否是基本类型，用于放置到标签text
export const isprimitive = (val) => {
    return typeof val === "number" ||
    typeof val === "string" ||
    val instanceof Number || 
    val instanceof String
}

// h函数
export const h = (sel, b, c) => {
    let data = {}, children, text, i
    // c只要有占位，即有三个参数
    if (c !== undefined) {
        if (b != null) {
            b = data
        }
        // 判断三种类型 array，text h
        if (Array.isArray(c)) {
            children = c
        }
        else if (isprimitive(c)) {
            text = c
        }
        else if (c && c.sel) {
            children = [c]
        }
    }
    // 不一定存在c的情况
    else if (b !== undefined && b !== null) {
        if (Array.isArray(b)) {
            children = b
        } else if (isprimitive(b)) {
            text = b
        } else if (b && b.sel) {
            children = [b]
        }else {
            data = b
        }
    }
    if (Array.isArray(children) && children.length > 0) {
        children.forEach((val, index) => {
            if (isprimitive(children[index])) {
                children[index] = vNode(undefined, undefined, undefined,children[index], undefined)
            }
        })
    }
    return vNode(sel, data, children,text,undefined)
}
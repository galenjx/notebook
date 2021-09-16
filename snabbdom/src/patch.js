import { vNode } from "./h"
import { createElement } from "./createElement"
export const patch = (oldVnode, newVnode) => {
    // 不是vnode，包装成vnode
    if (!oldVnode.sel) {
        oldVnode = vNode(oldVnode.tagName.toLowerCase(),{},undefined,undefined,oldVnode)
    }
    // 是否新旧节点】
    if(oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) { //是同一个节点
        // 进行精细化比较
    }else {
        // 不是同一节点，插入子节点，删除老节点
        let newDom = createElement(newVnode)
        oldVnode.elm.parentNode.insertBefore(newDom,oldVnode.elm)
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)

    }
}
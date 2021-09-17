import { vNode } from "./h"
import { createElement } from "./createElement"
import { updateChildren } from "./updateChildren"
export const patch = (oldVnode, newVnode) => {
    // 不是vnode，包装成vnode
    if (!oldVnode.sel) {
        oldVnode = vNode(oldVnode.tagName.toLowerCase(),{},undefined,undefined,oldVnode)
    }
    // 是否新旧节点】
    if(oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) { //是同一个节点
        // 进行精细化比较
        // 1,两者完全相同，啥也不干
        if (oldVnode == newVnode) return
        // 2,新节点有text
        if (newVnode.text) {
            if(oldVnode.text && oldVnode.text === newVnode.text) return
            oldVnode.elm.innerText = newVnode.text
        }else if (Array.isArray(newVnode.children) && newVnode.children.length > 0){
            // 3,新节点有children
            // 旧节点也有children
            if(Array.isArray(oldVnode.children) && oldVnode.children.length > 0){
                // diff精细化比较
                updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
            }else {
                oldVnode.elm.innerText = ''
                // 循环每一个children，插入dom
                newVnode.children.forEach((val, index) => {
                    let dom = createElement(newVnode.children[index])
                    oldVnode.elm.appendChild(dom)
                })
            }
        }
    }else {
        // 不是同一节点，插入子节点，删除老节点
        let newDom = createElement(newVnode)
        console.log("oldVnode.elm,",oldVnode.elm,oldVnode.elm.parentElement)
        oldVnode.elm.parentNode.insertBefore(newDom,oldVnode.elm)
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)

    }
}
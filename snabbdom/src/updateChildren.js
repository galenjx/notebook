import { patch } from './patch'
import { createElement } from './createElement'

const isSameVnode = (vNode1,vNode2) => {
    return vNode1.sel === vNode2.sel && vNode1.key === vNode2.key
}
export const updateChildren = (parentEle, oldCH, newCH) => {
    // 四指针与对应vnode定义
    let oldStartIndex = 0, newStartIndex = 0, oldEndIndex = oldCH.length - 1, newEndIndex = newCH.length - 1,
    oldStartVnode = oldCH[oldStartIndex], oldEndVnode = oldCH[oldEndIndex], newStartVnode = newCH[newStartIndex], newEndVnode = newCH[newEndIndex],
    // 四指针均不命中时循环找对应位置
    keyMap = null

    // 旧节点或新节点的循环完毕就结束循环，证明可能有新增或者需要删除节点
    while( oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 先判断是否置为了underfined
        if(!oldStartVnode || !oldCH[oldStartIndex]) {
            oldStartVnode = oldCH[++oldStartIndex]
        }else if(!oldEndVnode || !oldCH[oldEndIndex]) {
            oldEndVnode = oldCH[--oldEndIndex]
        }else if(!newStartVnode || !newCH[newStartIndex]) {
            newStartVnode = newCH[++newStartIndex]
        }else if(!newEndVnode || !newCH[newEndIndex]) {
            newEndVnode = newCH[--newEndIndex]
        }else if(isSameVnode(oldStartVnode,newStartVnode)){
            // 条件一命中 新前与旧前命中，patch节点，移动节点指针
            console.log("命中条件一")
            patch(oldStartVnode,newStartVnode)
            oldStartVnode = oldCH[++ oldStartIndex]
            newStartVnode = newCH[++ newStartIndex]
        }else if(isSameVnode(oldEndVnode,newEndVnode)){
            console.log("命中条件二")
            // 条件二命中 新后与旧后命中，patch节点，移动节点指针
            patch(oldEndVnode,newEndVnode)
            oldEndVnode = oldCH[-- oldEndIndex]
            newEndVnode = newCH[-- newEndIndex]
        }else if(isSameVnode(oldStartVnode,newEndVnode)){
            console.log("命中条件三")
            // 条件三命中 新后与旧前命中，移动节点与节点指针
            // patch(oldStartVnode,newEndVnode)
            // 把新后对应的节点（旧前）移动到旧后的后面
            parentEle.insertBefore(oldStartVnode.elm, oldEndVnode.elm.newxtSibling)
            oldStartVnode = oldCH[++ oldStartIndex]
            newEndVnode = newCH[-- newEndVnode]
        }else if(isSameVnode(oldEndVnode,newStartVnode)){
            console.log("命中条件四")
            // 条件四命中 新前与旧后命中移动节点与节点指针
            // 把新前对应的节点（旧后）移动到旧前的前面
            parentEle.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCH[-- oldEndIndex]
            newStartVnode = newCH[++ newStartIndex]
        }else {
            console.log('循环寻找')
            // 四种条件均不匹配，循环找到未匹配的新节点
            if(!keyMap) {
                keyMap = {}
                oldCH.forEach((val, index) => {
                    const key = val['key']
                    if(key){
                        keyMap['key'] = index
                    }
                });
            }
            
            // 若存在，即新的vnode找到在老node匹配的项
            const oldMapIndex = keyMap[newStartVnode['key']]
            if(!oldMapIndex){
                // 找不到，证明是新节点
                parentEle.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
            }else {
                
                // 找到了，需要移动位置
                let needTomoveVnode = oldCH[oldMapIndex]
                patch(needTomoveVnode,newStartVnode)
                oldCH[oldMapIndex] = null
                parentEle.insertBefore(needTomoveVnode.elm, oldStartVnode.elm)
            }
            // 匹配完成移动指针
            newStartVnode = newCH[++newStartIndex]
        }
    }
    // 循环结束
    console.log("循环结束")
    // 若新vnode有剩余，则说明需要插入
    if(oldStartIndex <= newEndIndex) {
        console.log("新增了，正在插入")
        for(let i = newStartIndex; i <= newEndIndex; i++) {
            parentEle.insertBefore(createElement(newCH[i]), oldEndVnode.elm)
        }
    }
    // 说明旧节点有剩余，需要删除
    if (oldStartIndex <= oldEndIndex) {
        console.log("减少了，正在删除")
        for(let i = oldStartIndex; i <= oldEndIndex; i++) {
            parentEle.removeChild(oldCH[i].elm)
        }
    }

}
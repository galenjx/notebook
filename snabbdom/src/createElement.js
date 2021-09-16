export const createElement = (vNode) => {
    //  创建元素
    let dom = document.createElement(vNode.sel)
    
    // 没有children的情况
    if(!vNode.children && vNode.text){
        // console.error(dom)
        dom.innerText = vNode.text
    // 有children的情况
    }else if (Array.isArray(vNode.children) && vNode.children.length > 0) {
        vNode.children.forEach((val,index) => {
            let vChild = createElement(vNode.children[index])
            dom.appendChild(vChild)
        });
    }
    return vNode.elm = dom
}
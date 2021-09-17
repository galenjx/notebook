import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    // h,
} from "snabbdom";

import { h } from './h'
import { patch } from './patch'

// const patch = init([
//     // Init patch function with chosen modules
//     classModule, // makes it easy to toggle classes
//     propsModule, // for setting properties on DOM elements
//     styleModule, // handles styling on elements with support for animations
//     eventListenersModule, // attaches event listeners
// ]);

const container = document.getElementById("container");
const btn = document.getElementById("btn");

// const titleNode = h('a',
//     {
//         props:
//         {
//             href: 'http://www.baidu.com',
//             target: '_blank'

//         }
//     },
//     "baidu")
// const ulNodex = h('ul', { props: { class: { "ulclass": true } } },
//     [
//         h("li", '西瓜'),
//         h("li", '香蕉'),
//         '瓜'
//     ]
// )
// const ulNode = h('ul', { },'as')
// // const ulNode1 = h('session', { },'xigua')
// const ulNode1 = h('ul', { },
//     [
//         h("li", '西瓜'),
//         h("li", '香蕉'),
//         '瓜'
//     ]
// )

// // Second `patch` invocation（节点上树）
// patch(container, ulNode); // Snabbdom efficiently updates the old view to the new state
// btn.onclick = () => {
//     patch(ulNode, ulNode1);
// }
 // Snabbdom efficiently updates the old view to the new state


 const myVnode1 = h("ul", { key: "ul" }, [
    h("li", { key: "D" }, "D"),
    h("li", { key: "C" }, "C"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "A" }, "A"),
  ]);
  // 上树
  patch(container, myVnode1);
  
  const myVnode2 = h("ul", { key: "ul" }, [
    h("li", { key: "C" }, "C"),
    h("li", { key: "B" }, "B"),
    h("li", { key: "E" }, "E"),
    h("li", { key: "M" }, "M"),
    h("li", { key: "D" }, "D"),

    // h("li", { key: "D" }, "D"),
    // h("li", { key: "C" }, "C"),
    // h("li", { key: "B" }, "B"),
    // h("li", { key: "A" }, "E"),
  ]);
  
  btn.onclick = function () {
    patch(myVnode1, myVnode2);
  };
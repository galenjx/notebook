
import { lookup } from './lookup'
import { renderTemplate } from './renderTemplate'
// 应对子tokens情况
export const parseArray = function(token, data) {
    // 找到该token需要熏染的数据（数组）
    const v = lookup(data,token[1])
    console.log(data,token,v)
    
    let resultStr = ''

    for (let i = 0; i < v.length; i++) {
        const element = v[i];
        resultStr += renderTemplate(token[2],{
            ...v[i],
            ".":v[i]
        })
    }

    return resultStr

}
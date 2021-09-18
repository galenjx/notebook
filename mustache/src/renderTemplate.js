import { lookup } from './lookup'
import { parseArray } from './parseArray'
export const renderTemplate = function(tokens, data) {
    // console.log('render')
    let resultStr = ''
    tokens.forEach((token, index) => {
        if(token[0] == 'text'){
            resultStr += token[1]
        }else if(token[0] == 'name') {
            resultStr += lookup(data,token[1])
        }else if(token[0] == "#") {
            resultStr += parseArray(token,data)
        }
    });
    return resultStr
}

import { Scanner } from './Scanner'
import { nestTokens } from './nestTokens'
// 先转为一维数组
export const toTokens = function (template) {
    let scanner = new Scanner(template)
    // 
    let word, tokens = []
    while (scanner.tail) {
        // 第一部分内容
        word = scanner.scanUntil('{{')
        if(word){
            tokens.push(['text',word])
        }
        
        // 括号内的内容。有可能是name， #， /
        scanner.scan('{{')
        word = scanner.scanUntil('}}')
        if(word) {
            if(word[0] == "#") {
                tokens.push(["#",word.substring(1)])
            }else if(word[0] == "/") {
                tokens.push(["/",word.substring(1)])
            }else {
                tokens.push(["name",word])
            }
        }

        scanner.scan('}}')
    }
    return nestTokens(tokens)
}
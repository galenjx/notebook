
import { toTokens } from "./toTokens"
import { renderTemplate } from "./renderTemplate"

window.templateEng = {
    render(template, data){
        // 将模版转为tokens
        let tokens = toTokens(template)
        // 将tokens转为模版字符串
        let resultStr = renderTemplate(tokens,data)
        return resultStr
    }
}
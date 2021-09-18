// 将一维数组形式tokens转为二维数组形式
export const nestTokens = function (tokens) {
    // nestedTokens为需要返回出去的数组
    // session为栈结构，用于记录当前操作的小tokens数组（在操作哪一个小数组（# /））
    // collector为当前的小数组
    let nestedTokens = [], session = [], collector = nestedTokens

    // 循环数组
    for (let i = 0; i < tokens.length; i++) {

    }
    tokens.forEach((token, index) => {
        switch (token[0]) {
            case "#":
                collector.push(token)
                session.push(token)
                collector = token[2] = []
                break;
            case "/":
                session.pop()
                collector = session.length > 0 ? session[session.length - 1][2] : nestedTokens
                break;
            default:
                collector.push(token)

        }
    });
    return nestedTokens
}
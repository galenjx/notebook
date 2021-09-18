// 'a.b.c'
export const lookup = function (data, keyName) {

    if (keyName.indexOf(".") != -1 && keyName != '.') {
        
        
        let tmp = data, keys = keyName.split('.')
        for (let i = 0; i < keys.length; i++) {
            tmp = tmp[keys[i]]
        }
        return tmp
    }
    return data[keyName]

}
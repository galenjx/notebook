module.exports = {
    entry:'./src/index.js',
    output: {
        filename:"bundle.js"
    },
    devServer:{
        port:'8000',
        contentBase:'www'
    }
}
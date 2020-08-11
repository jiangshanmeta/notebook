module.exports = {
    base:'/notebook/',
    title:'notebook',
    dest:'dist',
    themeConfig:{
        displayAllHeaders: true ,
        sidebar:require('../scripts/sidebar'),
    },
}
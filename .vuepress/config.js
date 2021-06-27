module.exports = {
    base:'/notebook/',
    title:'notebook',
    dest:'dist',
    themeConfig:{
        displayAllHeaders: true ,
        sidebar:require('../scripts/sidebar'),
    },
    head: [
        ['link', { rel: 'icon', href: '/notebook/favicon.ico' }]
    ]
}
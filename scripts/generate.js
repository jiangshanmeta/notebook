const fs = require('fs');
const path = require('path');

const prefix = fs.readFileSync(path.join(__dirname,'_prefix.md'),'utf8');

const sideBarMD = require('./sidebar').map((row)=>{
    return `* [${row.title}](.${row.path})`
}).join('\n');


fs.writeFile(path.join(__dirname,'../README.md'), prefix+'\n'+sideBarMD+'\n', 'utf8', (err) => {
    if (err) throw err;
    console.log('文件已被保存');
});
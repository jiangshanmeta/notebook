const cp = require('child_process');
cp.exec('cat messy.txt | sort | uniq',(err,stdout,stderr)=>{
    console.log(stdout)
})
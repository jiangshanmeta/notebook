const dns = require('dns');

dns.resolve('www.manning.com',(err,address)=>{
    if(err){
        console.error('Error',err);
        return;
    }
    console.log('addresses: ',address)
});
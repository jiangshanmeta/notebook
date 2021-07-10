const Writable = require('stream').Writable;
const util = require('util');

function CountStream(matchText,options){
    Writable.call(this,options);
    this.count = 0;
    this.matcher = new RegExp(matchText,'ig');
}

CountStream.prototype._write = function(chunk,encoding,cb){
    const matches = chunk.toString().match(this.matcher);
    if(matches){
        this.count += matches.length;
    }
    cb();
}

CountStream.prototype.end = function(){
    this.emit('total',this.count);
}

util.inherits(CountStream,Writable);

module.exports = CountStream
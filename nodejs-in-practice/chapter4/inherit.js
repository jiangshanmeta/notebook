const util = require('util');
const events = require('events');

const AudioDevice = {
    play(track){
        console.log('play:',track);
    },
    stop(){
        console.log('stop');
    }
}

function MusicPlayer(){
    this.playing = false;
    events.EventEmitter.call(this);
}

util.inherits(MusicPlayer,events.EventEmitter);

const musicPlayer = new MusicPlayer();

musicPlayer.on('play',function(track){
    this.playing = true;
    AudioDevice.play(track)
});

musicPlayer.on('stop',function(){
    this.playing = false;
    AudioDevice.stop();
});

musicPlayer.emit('play','The Roots - The Fire')

setTimeout(()=>{
    musicPlayer.emit('stop')
},1000);
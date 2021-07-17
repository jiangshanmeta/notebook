const assert = require('assert');
const net = require('net');
let clients = 0;
let expectedAssertions = 2;

const server = net.createServer((client)=>{
    clients++;
    const clientId = clients;
    console.log('client connected',clientId);
    client.on('end',()=>{
        console.log('client disconnected',clientId);
    });
    client.write(String(clientId));
    client.pipe(client);
});

server.listen(8000,()=>{
    console.log('server started at 8000');
    runTest(1,()=>{
        runTest(2,()=>{
            console.log('done')
            assert.strictEqual(expectedAssertions,0);
            server.close();
        });
    })
})

function runTest(expectedId,done){
    const client = net.connect(8000);
    client.on('data',(data)=>{
        assert.strictEqual(data.toString(),expectedId.toString());
        expectedAssertions--;
        client.end();
    });
    client.on('end',done);
}
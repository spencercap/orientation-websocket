const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer({
    cert: fs.readFileSync('../cert.pem'),
    key: fs.readFileSync('../key.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        console.log('received: %s', data);

        // re-broadcast incoming data
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });

    });

    ws.send('im da server!');
});

// kick off the server
server.listen(9000, () => {
    console.log('local servers up @ port:', server.address().port);
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();

function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function broadcastUserList() {
  const userList = Array.from(clients.values());
  broadcast({ type: 'users', users: userList });
}

wss.on('connection', ws => {
  ws.on('message', message => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'login':
        clients.set(ws, data.username);
        broadcastUserList();
        break;
      case 'chat':
        broadcast({ type: 'chat', message: `${clients.get(ws)}: ${data.message}` });
        break;
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    broadcastUserList();
  });
});

console.log('WebSocket server started on port 8080');

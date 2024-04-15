import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

var games = {};

export function peerProxy(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

    // Upgrade HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    // When new connection is established
    wss.on('connection', function connection(ws) {
        // On incoming message
        ws.on('message', async function incoming(message) {
            const data = JSON.parse(message);
            var user = data.user;

            gameId = getAvailableGame();

            if (!gameId) {
                // Game does not exist, create a new game session
                gameId = Object.keys(games).length + 1;
                console.log("Creating new game session: ", gameId);
                games[gameId] = {
                    clients: [ws],
                    users: [user],
                    ready: false
                };
            } else {
                // Add player to existing game session
                console.log("Adding second player to game session: ", gameId);
                games[gameId].players.push(ws);
                games[gameId].users.push(user);
            }

            if (games[gameId].ready) {
                console.log("Game is full, starting game session");
                const dialogue = await getBattleDialogue(games[gameId].users[0], games[gameId].users[1]);
                games[gameId].clients.forEach((player, index) => {
                    const opponentIndex = (index + 1) % 2;
                    player.send(JSON.stringify({ type: 'message', opponent: games[gameId].users[opponentIndex] , dialogue: dialogue }));
                });
                delete games[gameId];
            }

        });
    });
}

function getAvailableGame() {
    for (const id in games) {
        if (games[id].ready === false) {
            games[id].ready = true;
            return id;
        }
    }
}

function getBattleDialogue(player1, player2) {
    return ["Hello", "How are you", "I hope you are both getting this text"]
}
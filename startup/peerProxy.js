import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";
import { default as config } from "./openAIConfig.json" assert { type: "json" };

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

            var gameId = getAvailableGame();

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
                games[gameId].clients.push(ws);
                games[gameId].users.push(user);
            }

            if (games[gameId].ready) {
                console.log("Game is full, starting game session");
                var dialogue = await getBattleDialogue(games[gameId].users[0].prompt, games[gameId].users[1].prompt);
                const scoreAdjust = getRandomInteger(3, 13);
                games[gameId].clients.forEach((player, index) => {
                    const opponentIndex = (index + 1) % 2;
                    if (index == 1) {
                        dialogue[3] = dialogue[3] === "1" ? "2" : "1";
                    }
                    player.send(JSON.stringify({ type: 'message', opponent: games[gameId].users[opponentIndex], 
                        scoreAdjust: scoreAdjust, dialogue: dialogue }));
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

async function getBattleDialogue(player1, player2) {
    var prompt = `${player1} vs. ${player2}`;
    var response = await generateDialogue(prompt);
    var dialogue = await parseDialogue(response);
    return dialogue;
}

async function generateDialogue(prompt) {
    var requestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": config.basePrompt
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.openAiKey}`
        },
        body: JSON.stringify(requestBody)
    };
      
    const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        .then(async response => await response.json())
        .then(response => {
          return response;
        })
        .catch(err => console.error(err));
    return response.choices[0].message.content;
}

function parseDialogue(text) {
    var dialogue = [];

    var startIndex = text.indexOf("Turn 1:") + "Turn 1:".length;
    var endIndex = text.indexOf("Turn 2");

    var firstTurn = text.substring(startIndex, endIndex).trim();

    startIndex = text.indexOf("Turn 2:") + "Turn 2:".length;
    endIndex = text.indexOf("Turn 3");

    var secondTurn = text.substring(startIndex, endIndex).trim();

    startIndex = text.indexOf("Turn 3:") + "Turn 3:".length;
    endIndex = text.indexOf("WINNER");

    var thirdTurn = text.substring(startIndex, endIndex).trim();

    let match = text.match(/WINNER: (\d+)/);

    var winner = null;
    if (match) {
        winner = match[1];
    } else {
        console.log("Winner not found");
    }

    dialogue.push(firstTurn);
    dialogue.push(secondTurn);
    dialogue.push(thirdTurn);
    dialogue.push(winner);

    return dialogue;
}

function getRandomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
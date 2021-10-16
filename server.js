const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const createGame = require('./public/game')

const game = createGame();

const app = express();
const server = http.createServer(app)
const sockets = socketio(server)
app.use(express.static('public'))

const intervals = {}

sockets.on('connection', (socket) => {    
    console.log('someone has connected his id is ' + socket.id)

    game.addPlayer(socket.id)//linha que adiciona o jogador 

    intervals[socket.id] = setInterval(() => {
        game.movePlayer({
            'playerId': socket.id,
            'key': game.state.players[socket.id].lastKey
        })
        sockets.emit('stateChanged', game.state)
    }, 500)

    socket.emit('start', game.state)

    game.start(() => sockets.emit('stateChanged', game.state));

    sockets.emit('stateChanged', game.state)

    socket.on('disconnect', () => {
        clearInterval(intervals[socket.id])
        delete game.state.players[socket.id]
    })

    socket.on('setName', (data) => {
        console.log(data);
        game.state.players[socket.id].name = data.name;

    })

    socket.on('movePlayer', (command) => {
        console.log('jogador moveu comando: ' + command.key)
        console.log('jogador que moveu: ' + socket.id)
        command.playerId = socket.id;
        game.movePlayer(command)
        sockets.emit('stateChanged', game.state)
    })
})

server.listen(3000, () => {
    console.log('app is running on 3000 port ')
})
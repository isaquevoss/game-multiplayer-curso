const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const createGame = require('./public/game')

const game = createGame();

const app = express();
const server = http.createServer(app)
const sockets = socketio(server)
app.use(express.static('public'))

sockets.on('connection', (socket) => {
    console.log('someone has connected his id is ' + socket.id)

    game.addPlayer(socket.id)//linha que adiciona o jogador 

    socket.emit('start', game.state)

    sockets.emit('addPlayer', game.state)

    socket.on('disconnect', () => {
        delete game.state.players[socket.id]
    })
    socket.on('movePlayer', (command) => {
        console.log('jogador moveu comando: '+command)
        console.log('jogador que moveu: '+socket.id)
        
        game.movePlayer(socket.id)
        sockets.emit('stateChanged', game.state)
    })
})





server.listen(3000, () => {
    console.log('app is running on 3000 port ')
})
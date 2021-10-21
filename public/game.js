function createGame() {
    state = {
        players: {},
        fruits: {},
        screen: {
            'height': 20,
            'width': 20
        }
    }
    function checkCollision(playerId) {
        player = state.players[playerId]
        for (const fruit in state.fruits) {
            if (player.x == state.fruits[fruit].x && player.y == state.fruits[fruit].y) {
                delete state.fruits[fruit]
                player.points++
                console.log('deletou')
            }

        }
    }

    function start(observer) {
        setInterval(() => {
            if (Object.keys(state.fruits).length < 15)
                addFruit(Math.floor(Math.random() * 13543435524))
            observer(state);
        }, 1500) 
    }

    function addPlayer(playerId) {
        state.players[playerId] = {
            x: Math.floor(Math.random() * state.screen.height),
            y: Math.floor(Math.random() * state.screen.width),
            color: 'red',
            points: 0,
        }
    }
    function addFruit(fruitId) {
        state.fruits[fruitId] = {
            x: Math.floor(Math.random() * state.screen.height),
            y: Math.floor(Math.random() * state.screen.width),
            color: 'orange'
        }
    }

    function setState(newState) {
        Object.assign(game.state, newState)
    }

    function movePlayer(command) {
        this.state.players[command.playerId].lastKey = command.key;
        if (command.key == 'ArrowRight')
            if (this.state.players[command.playerId].x >= this.state.screen.width - 1)
                this.state.players[command.playerId].x = 0
            else
                this.state.players[command.playerId].x++

        if (command.key == 'ArrowLeft')
            if (this.state.players[command.playerId].x <= 0)
                this.state.players[command.playerId].x = this.state.screen.width - 1
            else
                this.state.players[command.playerId].x--

        if (command.key == 'ArrowDown')
            if (this.state.players[command.playerId].y >= this.state.screen.height - 1)
                this.state.players[command.playerId].y = 0
            else
                this.state.players[command.playerId].y++

        if (command.key == 'ArrowUp')
            if (this.state.players[command.playerId].y <= 0)
                this.state.players[command.playerId].y = this.state.screen.height - 1
            else
                this.state.players[command.playerId].y--

        checkCollision(command.playerId);
    }

    return {
        state, addPlayer, movePlayer, setState, addFruit, start
    }
}

module.exports = createGame;
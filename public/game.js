function createGame() {
    state = {
        players: {},
        fruits: {},
        screen: {
            'height': 20,
            'width': 20
        }
    }
    function checkCollision(playerId){
        player = state.players[playerId]
        for (const fruit in state.fruits){
            if (player.x == state.fruits[fruit].x  && player.y == state.fruits[fruit].y){
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
        }, 3000)
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
            this.state.players[command.playerId].x++

        if (command.key == 'ArrowLeft')
            this.state.players[command.playerId].x--

        if (command.key == 'ArrowUp')
            this.state.players[command.playerId].y--

        if (command.key == 'ArrowDown')
            this.state.players[command.playerId].y++

        checkCollision(command.playerId);
    }

    return {
        state, addPlayer, movePlayer, setState, addFruit, start
    }
}

module.exports = createGame;
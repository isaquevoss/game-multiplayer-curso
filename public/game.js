function createGame() {
    state = {
        players: {},
        fruit: {},
        screen: {
            'height': 20,
            'width': 20
        }
    }
    function addPlayer(playerId) {
        state.players[playerId] = {
            x: Math.floor(Math.random() * state.screen.height),
            y: Math.floor(Math.random() * state.screen.width)
        }
    }
    function setState(newState) {
        Object.assign(game.state, newState)
    }

    function movePlayer(command) {
        if (command.key == 'ArrowRight')
            this.state.players[command.playerId].x++

        if (command.key == 'ArrowLeft')
            this.state.players[command.playerId].x--

        if (command.key == 'ArrowUp')
            this.state.players[command.playerId].y--

        if (command.key == 'ArrowDown')
            this.state.players[command.playerId].y++

    }

    return {
        state, addPlayer, movePlayer, setState
    }
}

module.exports = createGame;
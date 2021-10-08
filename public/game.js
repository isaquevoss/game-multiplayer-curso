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
    function setState(newState){
        Object.assign(game.state, newState)
    }
    
    function movePlayer(playerId){        
        this.state.players[playerId].x++
    }

    return {
        state, addPlayer, movePlayer, setState
    }
}

module.exports = createGame;
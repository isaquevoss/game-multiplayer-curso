const createGame = require('./game');

game = createGame();

game.start(() => {})

game.addPlayer('teste');

game.movePlayer({playerId: 'teste',key: 'ArrowUp'})

setTimeout(()=>{console.log(game)},10000)

console.log(game);
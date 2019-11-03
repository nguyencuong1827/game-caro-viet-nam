function getBestMove(currentBoard) {
    const Squares = currentBoard;
    let bestMove = Math.floor(Math.random() * 400);
    while(Squares[bestMove] !== null){
        bestMove = Math.floor(Math.random() * 400); 
    }
    return bestMove;
}
export default getBestMove;
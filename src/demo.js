class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            squares: Array(400).fill(null),
            xIsNext: true,
            winner: null
        }
    }
    
    //kiểm tra trên dòng
    checkWinOnRow(square, index){
        let count = 1;
        let x1 = index - 1;
        let x2 = index + 1;
        let divIndex = Math.floor(index / 20);
        while(this.state.squares[x1] === square && this.state.squares[x2] === square && x1 >= 0 && x2 < 400 ){
            let divX1 = Math.floor(x1/20);
            let divX2 = Math.floor(x2/20);
            x1 = x1 - 1;
            x2 = x2 + 1;
            count = count + 2;
            if(count === 5 ){
                if((divX1 !== divIndex) || (divX2 !== divIndex) || (this.state.squares[x1] !== square && this.state.squares[x2] !== square && this.state.squares[x1] !== null && this.state.squares[x2] !== null))
                    return;
                else{
                    return square;
                }
            }
        }
        let temp = count;
        while(x1 >=0 && this.state.squares[x1] === square){
            count = count + 1;
            let divX1 = Math.floor(x1/20);
            let divX2 = Math.floor(x2/20);
            x1 = x1 - 1;
            if(count === 5){
                if((this.state.squares[x1] !== square && this.state.squares[x2] !== square && this.state.squares[x1] !== null && this.state.squares[x2] !== null)){
                    return;
                }
                else if(temp !== 1 && ( divX1 !== divIndex || divX2 !== divIndex)){
                    return;
                }
                else if(temp === 1 && (divX1 !== divIndex)){
                    return;
                }
                else{
                    return square;
                }
            }
        }
        while(x2 < 400 && this.state.squares[x2] === square){
            count = count + 1;
            let divX1 = Math.floor(x1/20);
            let divX2 = Math.floor(x2/20);
            x2 = x2 + 1;
            if(count === 5){
                if((this.state.squares[x1] !== square && this.state.squares[x2] !== square && this.state.squares[x1] !== null && this.state.squares[x2] !== null)){
                    return;
                }
                else if (temp !== 1 && (divX1 !== divIndex || divX2 !== divIndex)){
                    return;
                } 
                else if(temp === 1 && (divX2 !== divIndex)){
                    return;
                }
                else{
                    return square;
                }
            }
        }
    }

    //kiểm tra trên cột
    checkWinOnColumn(square, index){
        let count = 1;
        let y1 = index - 20;
        let y2 = index + 20;
        while(this.state.squares[y1] === square && this.state.squares[y2] === square && y1 >= 0 && y2 < 400){
            y1 = y1 - 20;
            y2 = y2 + 20;
            count = count + 2;
            if(count === 5 ){
                if(this.state.squares[y1] !== square && this.state.squares[y2] !== square && this.state.squares[y1] !== null && this.state.squares[y2] !== null)
                    return;
                else{
                    return square;
                }
            }
        }
        while(y1 >=0 && this.state.squares[y1] === square){
            count ++;
            y1 = y1 - 20;
            if(count === 5){
                if(this.state.squares[y1] !== null && this.state.squares[y1] !== square && this.state.squares[y2] !== null && this.state.squares[y2] !== square){
                    return;
                }
                else{
                    return square;
                }
            }
        }
        while(y2 < 400 && this.state.squares[y2] === square){
            count ++;
            y2 = y2 + 20;
            if(count === 5){
                if(this.state.squares[y2] !== null && this.state.squares[y2] !== square && this.state.squares[y1] !== null && this.state.squares[y1] !== square){
                    return;
                }
                else{
                    return square;
                }
            }
        }
    }

    // kiểm tra đường chéo thứ 1
    checkWinOnDiagonationFirst(square, index){
        let count = 1;
        let y1 = index - 21;
        let y2 = index + 21;
        while(this.state.squares[y1] === square && this.state.squares[y2] === square && y1 >= 0 && y2 < 400){
            y1 = y1 - 21;
            y2 = y2 + 21;
            count = count + 2;
            if(count === 5 ){
                if(this.state.squares[y1] !== square && this.state.squares[y2] !== square && this.state.squares[y1] !== null && this.state.squares[y2] !== null)
                    return;
                else{
                    return square;
                }
            }
        }
        while(y1 >=0 && this.state.squares[y1] === square){
            count ++;
            y1 = y1 - 21;
            if(count === 5){
                if(this.state.squares[y1] !== null && this.state.squares[y1] !== square && this.state.squares[y2] !== null && this.state.squares[y2] !== square){
                    return;
                }
                else{
                    return square;
                }
            }
        }
        while(y2 < 400 && this.state.squares[y2] === square){
            count ++;
            y2 = y2 + 21;
            if(count === 5){
                if(this.state.squares[y2] !== null && this.state.squares[y2] !== square && this.state.squares[y1] !== null && this.state.squares[y1] !== square){
                    return;
                }
                else{
                    return square;
                }
            }
        }
    }

    // kiểm tra đường chéo thứ 2
    checkWinOnDiagonationSecond(square, index){
        let count = 1;
        let y1 = index - 19;
        let y2 = index + 19;
        while(this.state.squares[y1] === square && this.state.squares[y2] === square && y1 >= 0 && y2 < 400){
            y1 = y1 - 19;
            y2 = y2 + 19;
            count = count + 2;
            if(count === 5 ){
                if(this.state.squares[y1] !== square && this.state.squares[y2] !== square && this.state.squares[y1] !== null && this.state.squares[y2] !== null)
                    return;
                else{
                    return square;
                }
            }
        }
        while(y1 >=0 && this.state.squares[y1] === square){
            count ++;
            y1 = y1 - 19;
            if(count === 5){
                if(this.state.squares[y1] !== null && this.state.squares[y1] !== square && this.state.squares[y2] !== null && this.state.squares[y2] !== square){
                    return;
                }
                else{
                    return square;
                }
            }
        }
        while(y2 < 400 && this.state.squares[y2] === square){
            count ++;
            y2 = y2 + 19;
            if(count === 5){
                if(this.state.squares[y2] !== null && this.state.squares[y2] !== square && this.state.squares[y1] !== null && this.state.squares[y1] !== square){
                    return;
                }
                else{
                    return square;
                }
            }
        }
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if(squares[i] || this.state.winner){
            return;
        }
        squares[i] = this.state.xIsNext ? 'x' : 'o';
        if(this.checkWinOnRow(squares[i], i) || this.checkWinOnColumn(squares[i], i) || this.checkWinOnDiagonationFirst(squares[i], i) || this.checkWinOnDiagonationSecond(squares[i], i)){
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
                winner: squares[i]
            });
            return;
        }
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    restartClick(){
        this.setState({
            squares: Array(400).fill(null),
            xIsNext: true,
            winner: null
        })
    }

    renderSquare(i) {
        return (<Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)}></Square>)
    }

    render() {
        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let board = [];
        for(let i = 0; i < 20; i++){
            let row =[];
            for(let j =0; j < 20; j++){
                row.push(this.renderSquare(i*20 + j));
            }
            board.push(row);
        }

        let resultBoard = board.map((val) => {
            return(<div className="row">{val}</div>);
        });
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-8">
                        <h2 className="ml-10">Game Caro VietNam</h2>
                        {resultBoard}
                    </div>
                    <div className="col-md-4 mt-5">
                        <h5>{status}</h5>
                        <Restart onClick={()=>this.restartClick()}></Restart>
                    </div>
                </div>
                
            </div>
        );
    }
}
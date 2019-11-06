function receivePositionMove(socket, index){
    if(socket){
        socket.emit('user-send-position-move', index);
    }
}



const socketIOReceive = {
    receivePositionMove
}

export default socketIOReceive
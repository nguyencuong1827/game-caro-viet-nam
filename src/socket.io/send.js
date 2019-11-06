function sendPositionMove(socket, index){
    if(socket){
        socket.emit('user-send-position-move', index);
    }
}



const socketIOSend = {
    sendPositionMove
}

export default socketIOSend
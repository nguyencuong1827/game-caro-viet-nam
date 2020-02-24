import io from "socket.io-client";
import config from "../config/api-config";


const createGlobalSocket =  () => {
    global.socket = io(config.apiUrlHeroku);
}

export default createGlobalSocket;
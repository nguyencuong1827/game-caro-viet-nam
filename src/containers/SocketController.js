import React from "react"
import { useDispatch, useSelector } from "react-redux"
import io from "socket.io-client"
import config from "../config/api-config"
import userConstants from "../constants/user-constants"
import { getAuthentication } from "../helpers/selectors"

const SocketController = () => {
  const dispatch = useDispatch()
  const auth = useSelector(getAuthentication)

  const onLoadRanking = (data) => {
    if (data) {
      dispatch({type: userConstants.LOAD_RANKING, payload: data})
    }
  }
  if(!auth.loggedIn) {
    return null
  }

  const setupSocket = () => {
    global.socket = io(config.apiUrlHeroku)
  }

  setupSocket()

  global.socket.on('server-send-array-ranking', onLoadRanking)

  return null
}

export default SocketController

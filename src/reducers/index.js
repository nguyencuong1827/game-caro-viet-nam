import { combineReducers } from 'redux';
import GameReducer from './game-reducer'

export default combineReducers({
    game: GameReducer
});
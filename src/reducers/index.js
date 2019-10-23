import { combineReducers } from 'redux';
import game from './game-reducer'
import authentication  from './authentication-reducer';
import registration from './registration-reducer';
import users from './user-reducer';
import alert from './alert-reducer';

const rootReducer = combineReducers({
    game,
    authentication,
    registration,
    users,
    alert
});
export default rootReducer;

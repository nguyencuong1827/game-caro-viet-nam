import  userConstants  from '../constants/user-constants';

const res = JSON.parse(localStorage.getItem('res'));
const initialState = res? { loggedIn: true, res } : {};

function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return{
        ...state,
        loggingIn: true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        res: action.payload
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
export default authentication;
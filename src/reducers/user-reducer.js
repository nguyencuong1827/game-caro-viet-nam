import  userConstants  from '../constants/user-constants';

 function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_INFO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_INFO_SUCCESS:
      return {
        ...state,
        info: action.payload
      };
    case userConstants.GET_INFO_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case userConstants.UPDATE_INFO_REQUEST: {
      return{
        ...state,
        loading: true
      }
    }
    case userConstants.UPDATE_INFO_SUCCESS:
    case userConstants.UPDATE_INFO_FAILURE: {
      return{
        ...state,
        error: action.payload
      }
    }
    case userConstants.CHANGE_PASSWORD_INFO_REQUEST: {
      return{
        ...state,
        changing: true
      }
    }
    case userConstants.CHANGE_PASSWORD_INFO_SUCCESS:
    case userConstants.CHANGE_PASSWORD_INFO_FAILURE: {
      return{
        ...state,
        error: action.payload
      }
    }
    case userConstants.LOAD_RANKING: {
      return {
        ...state,
        ranking: action.payload
      }
    }

    default:
      return state
  }
}
export default users;

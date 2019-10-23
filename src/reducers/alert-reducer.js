import  alertConstants  from '../constants/alert-constants';

function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}
export default alert;
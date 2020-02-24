import  alertConstants  from '../constants/alert-constants';


function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function warning(message) {
    return { type: alertConstants.WARNING, message };
}


function clear() {
    return { type: alertConstants.CLEAR };
}

const alertActions = {
    success,
    error,
    warning,
    clear
};
export default alertActions;
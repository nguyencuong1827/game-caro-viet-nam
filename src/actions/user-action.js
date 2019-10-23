/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import  userConstants  from '../constants/user-constants';
import  userService  from '../services/user-service';
import  alertActions  from './alert-action';
import  history  from '../helpers/history';



function login(username, password) {
    return dispatch => {
        dispatch(request({ }));

        userService.login(username, password)
            .then(
                res => { 
                    dispatch(success(res));
                    history.push('/');
                    dispatch(alertActions.success('Mời bạn chơi game'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST} }
    function success(res) { return { type: userConstants.LOGIN_SUCCESS, payload: res } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, payload: error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request());

        userService.register(user)
            .then(  
                user => { 
                    dispatch(success());
                    history.push('/log-in');
                    dispatch(alertActions.success('Đăng ký thành công'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST} }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getInfo() {
    return dispatch => {
        dispatch(request());

        userService.getInfo()
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_INFO_REQUEST } }
    function success(user) { return { type: userConstants.GET_INFO_SUCCESS, payload: user } }
    function failure(error) { return { type: userConstants.GET_INFO_FAILURE, payload: error } }
}



const userActions = {
    login,
    logout,
    register,
    getInfo
};
export default userActions;
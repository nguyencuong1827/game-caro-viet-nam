/* eslint-disable one-var */
/* eslint-disable operator-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import  userConstants  from '../constants/user-constants';
import  userService  from '../services/user-service';
import  alertActions  from './alert-action';
import  history  from '../helpers/history';
import calculatePointWin from '../algorithm/calculatePointWin';
import upRank from '../algorithm/upRank';
import downRank from '../algorithm/downRank';
import rankConstants from '../constants/rank-constants';

function login(username, password) {
    return dispatch => {
        dispatch(request({ }));

        userService.login(username, password)
            .then(
                res => {
                    dispatch(success(res));
                    history.push('/room');
                },
                error => {
                    console.log(error);
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

function register(user, confirmPassword) {
    return dispatch => {
        dispatch(request());
        if(user.password !== confirmPassword){
            dispatch(alertActions.error('Xác nhận mật khẩu không đúng'));
            dispatch(failure());
            return;
        }
        userService.register(user)
            .then(
                message => {
                    dispatch(success());
                    history.push('/login');
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
                user => {
                    dispatch(success(user));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_INFO_REQUEST } }
    function success(user) { return { type: userConstants.GET_INFO_SUCCESS, payload: user } }
    function failure(error) { return { type: userConstants.GET_INFO_FAILURE, payload: error } }
}

function updateInfo(fullName, nickName, urlAvatar) {
    return dispatch => {
        dispatch(request());

        userService.updateInfo(fullName, nickName, urlAvatar)
            .then(
                message => {
                    dispatch(success());
                    dispatch(alertActions.success('Cập nhật thông tin thành công'));
                    const res = JSON.parse(localStorage.getItem('res'));
                    localStorage.removeItem('res');
                    if(urlAvatar === ''){
                        res.user = {...res.user, fullName, nickName};
                    }
                    else{
                        res.user = {...res.user, fullName, nickName, urlAvatar};
                    }
                    localStorage.setItem('res', JSON.stringify(res));
                    dispatch(updateResOfNavigation(res));
                    dispatch(updateUserOfInfo(res.user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.UPDATE_INFO_REQUEST} }
    function success() { return { type: userConstants.UPDATE_INFO_SUCCESS } }
    function failure(error) { return { type: userConstants.UPDATE_INFO_FAILURE, payload: error } }
    function updateResOfNavigation(res) { return { type: userConstants.LOGIN_SUCCESS, payload: res } }
    function updateUserOfInfo(user) { return { type: userConstants.GET_INFO_SUCCESS, payload: user } }
}

function changePassword(newPassword, oldPassword, confirmPassword) {
    return dispatch => {
        dispatch(request());
        if(newPassword !== confirmPassword){
            dispatch(alertActions.error('Xác nhận mật khẩu không đúng'));
            dispatch(failure());
            return;
        }
        userService.changePassword(newPassword, oldPassword)
            .then(
                message => {
                    dispatch(success());
                    userService.logout();
                    history.push('/login');
                    dispatch(alertActions.success('Đổi mật khẩu thành công'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.CHANGE_PASSWORD_INFO_REQUEST} }
    function success() { return { type: userConstants.CHANGE_PASSWORD_INFO_SUCCESS } }
    function failure(error) { return { type: userConstants.CHANGE_PASSWORD_INFO_FAILURE, payload: error } }
}

function updatePointAndRank(type, numberNegative, yourPoint, yourRank, rivalRank){
    console.log("Cập nhật");
    console.log(type, numberNegative, yourPoint, yourRank, rivalRank);
    return dispatch => {
        let newPoint = yourPoint, newRank = yourRank, newNumberNegative = numberNegative;
        if(type === 'win'){
            newNumberNegative = 0;
            newPoint = yourPoint + calculatePointWin(yourRank, rivalRank);
            if(newPoint >= 100 && yourRank !== rankConstants.CHALLENGER){
                newRank = upRank(yourRank);
                newPoint = newPoint % 100;
            }
        }
        else{
            newPoint = yourPoint - 5;
            console.log(newPoint);
            console.log(numberNegative);
            if(newPoint < 0){
                newPoint = 0;
                newNumberNegative = 0;
                if(numberNegative === 3 && yourRank !== rankConstants.BRONZE){
                    newRank = downRank(yourRank);
                    newPoint = 95;
                    console.log(newRank, newNumberNegative);
                }
                if(numberNegative < 3 && yourRank !== rankConstants.BRONZE){
                    newNumberNegative = numberNegative + 1;
                    console.log(newNumberNegative);
                }
            }
        }
        console.log(newRank, newPoint, newNumberNegative);
        userService.updatePointAndRank(newRank, newPoint, newNumberNegative)
            .then(
                message => {
                    if(type === 'win' && yourRank !== newRank){
                        dispatch(alertActions.success(`Chúc mừng bạn đã được thăng lên hạng: ${newRank}`));
                    }
                    if(type === 'lose' && yourRank !== newRank){
                        dispatch(alertActions.warning(`Bạn đã bị hạ xuống hạng: ${newRank}`));
                        console.log('Xuống hạng');
                    }
                    const point = newPoint, rank = newRank, numberNegativePoint = newNumberNegative;
                    console.log(numberNegativePoint);
                    const res = JSON.parse(localStorage.getItem('res'));
                    localStorage.removeItem('res');
                    res.user = {...res.user, point, rank, numberNegativePoint};
                    localStorage.setItem('res', JSON.stringify(res));
                    global.socket.emit('user-send-point-and-rank', res.user);
                    console.log('Cập nhật điểm và hạng');
                    dispatch(updateResOfNavigation(res));
                },
                error => {
                    console.log(error);
                }
            );


    };
    function updateResOfNavigation(res) { return { type: userConstants.LOGIN_SUCCESS, payload: res } }

}

const userActions = {
    login,
    logout,
    register,
    getInfo,
    updateInfo,
    changePassword,
    updatePointAndRank
};
export default userActions;

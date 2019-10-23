 function authHeader() {
    // return authorization header with jwt token
    const res = JSON.parse(localStorage.getItem('res'));

    if (res && res.token) {
        return { 'Authorization': `Bearer  ${res.token}` };
    } 
    return null;
}
export default authHeader;
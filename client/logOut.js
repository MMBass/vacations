import loginFunctions from "./login.js";

export default function logOut(){
    loginFunctions.startLogin();
    window.sessionStorage.removeItem('vacations_t');
}
import clientFunctions from "./clientMainPage.js";
import adminFunctions from "./adminMainPage.js";
import signUpFunctions from "./signUp.js";
import loginTemplate from "./templates/loginT.js";

const SERVER = `http://localhost:3000/`;

function startLogin(userName,password){
    const BODY = document.querySelector('body');
    BODY.innerHTML = loginTemplate;

    if(userName && password)fetchLogin(username,password);
    const LOGIN_BTN = document.getElementById('loginBtn');
    const SIGN_UP_BTN = document.getElementById('signUpBtn');

    
   LOGIN_BTN.addEventListener('click',loginCheckExsist);
   SIGN_UP_BTN.addEventListener('click',moveToSignUpPage);
}

function loginCheckExsist(e){
    e.preventDefault();
    const USER_NAME = document.getElementById('UserInput').value;
    const PASSWORD = document.getElementById('PassInput').value;
    fetchLogin(USER_NAME,PASSWORD)
}

function fetchLogin(u,p){
    fetch(`${SERVER}login`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "basic "+btoa(u+":"+p)
        },
        body: JSON.stringify({
           userName: u,
           pass: p,
           }),
       })
       .then(res=>{res.text()
        .then(answer=>{
            answer = JSON.parse(answer);
            if(answer === false){
                   alert('incorrect userName or password, please try again')
            }else{
             
                 if(answer.admin === 0){
                    window.sessionStorage.setItem('vacations_t',answer.token);
                    clientFunctions.moveToMainPage(answer.userName,answer.id);
                    }else if(answer.admin == 1){
                    window.sessionStorage.setItem('vacations_t',answer.token);
                    adminFunctions.moveToMainPage(answer.userName);
                    } 
              };
        })});
}

function moveToSignUpPage(){
    signUpFunctions.moveToSignUp();
}

export default {fetchLogin:fetchLogin,startLogin:startLogin}
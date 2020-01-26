import loginFunctions from "./login.js";
import signUpTemplate from "./templates/signUpT.js";
const SERVER = `http://localhost:3000/`;

function moveToSignUp(){
   const BODY = document.querySelector('body');
   BODY.innerHTML = signUpTemplate;

   const SIGN_UP_BTN = document.getElementById('signUpBtn');
   SIGN_UP_BTN.addEventListener('click',signCheckExsist)
}

function signCheckExsist(e){
  e.preventDefault();
  const USER_NAME = document.getElementById('inputUserName').value;
  const PASSWORD = document.getElementById('inputPassword').value;
  const FIRST_NAME = document.getElementById('inputFirstName').value;
  const LAST_NAME = document.getElementById('inputLastName').value;
  const FULL_NAME = `${FIRST_NAME} ${LAST_NAME}`; 

  fetch(`${SERVER}sign`,{
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': "basic "+btoa(USER_NAME+":"+PASSWORD)
      },
      body: JSON.stringify({
         userName: USER_NAME,
         pass: PASSWORD,
         fullName: FULL_NAME,
         }),
     })
     .then(res=>{res.text()
      .then(answer=>{
          if(answer == "notExistYet"){
            loginFunctions.fetchLogin(USER_NAME,PASSWORD)
          }else if(answer == "exist"){
            alert(`${USER_NAME} alredy exist in the system , would you like to log in?`);
          };
      })});
}

export default {moveToSignUp:moveToSignUp};
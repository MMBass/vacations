import loginFunctions from "./login.js";
import adminFunctions from "./adminMainPage.js";
import clientFunctions from "./clientMainPage.js";

const SERVER = `http://localhost:3000/`;

let admin = false;

function onLoad(){
    const token = window.sessionStorage.getItem('vacations_t');
    if(token != null){
        fetch(`${SERVER}load`,{
            method: "GET",
             headers:{
                'Content-type':'application/json',
                'Authorization': "bearer " + window.sessionStorage.getItem('vacations_t')
         }})
         .then(res=>{res.text()
          .then(answer=>{
              answer= JSON.parse(answer);
              
              if(answer.password)loginFunctions.fetchLogin(answer.userName,answer.password)
              else loginFunctions.startLogin();
              if(answer.userName === "mmbass") admin = true;
          })});
    }else{
        loginFunctions.startLogin();
    }

    var socket = io("http://localhost:3000");
    socket.on('update_v',(answer)=> {
        console.log(JSON.stringify(answer))
    if(admin === true) adminFunctions.updateLive(answer[0]);
    else clientFunctions.updateLive(answer[0]);
    });
}
onLoad();
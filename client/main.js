import loginFunctions from "./login.js";
import adminFunctions from "./adminMainPage.js";
import clientFunctions from "./clientMainPage.js";

const SERVER = `http://localhost:3000/`;

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
          })});
    }else{
        loginFunctions.startLogin();
    }

    var socket = io("http://localhost:3000");
    socket.on('update_v',(answer)=> {
       let admin =  window.sessionStorage.getItem('vacations_a')
        console.log(JSON.stringify(answer))
        console.log("ADMIN OR NOT:   "+admin);
    if(admin === 'true') adminFunctions.updateLive(answer[0]);
    else clientFunctions.updateLive(answer[0]);
    });
}
onLoad();
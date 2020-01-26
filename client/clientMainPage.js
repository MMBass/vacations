import cards from "./templates/cards.js";
import logOut from "./logOut.js";

const SERVER = `http://localhost:3000/`;
let userId = 0;
let userN = '';
const client = true;



 function moveToMainPage(userName,id){
    const MAIN_DIV_TEMPLATE = `<div id="mainDiv" class="jumbotron row pt-5">
      <div class="col-12 bg-primary rounded p-1 pt-2">
      <button id="btnOut" class="float-right btn btn-secondary">log out</button>
      <h3>Helllo ${userName}</h3>
      </div>
    </div>`;

    const BODY = document.querySelector('body');
    BODY.innerHTML = MAIN_DIV_TEMPLATE;
    userId = id;
    userN = userName;
    appendCards();
}

function appendCards(){
    const MAIN_DIV = document.querySelector('#mainDiv');

    fetch(`${SERVER}vacations?uid=${userId}`,{
        method: "GET",
         headers:{
            'Content-type':'application/json',
            'Authorization': "bearer " + window.sessionStorage.getItem('vacations_t')
     }})
       .then(res=>{res.text()
        .then(data=>{
            data = JSON.parse(data);
            let vacationsArr = data.returnedArr;
            let followsArr = data.followsArr;
        
            followsArr.map((f,i)=>{
                followsArr[i] = f.vacation_id
            });

            //reorder the followen v to be first:
            vacationsArr.map((v)=>{
                if(followsArr.indexOf(Number(v.id)) >= 0){
                    vacationsArr.splice(vacationsArr.indexOf(v),1);
                    vacationsArr.unshift(v);
                }
            })

            let colors=['warning','success','danger','info']
            let color= '';
            let counter = 0;
            for(let vacation of vacationsArr){
                if(counter <= 4){
                    color = colors[counter];
                }else if(counter > 4){
                    counter = 0;
                    color = colors[counter];
                }
                counter++;

                if(vacationsArr.indexOf(vacation) < followsArr.length){
                    MAIN_DIV.innerHTML += `<div class="col-lg-4 col-sm-6 col-xs-12">
                    ${cards.cardClient(vacation,'eye-slash',color)}
                     </div>`
                }else{
                    MAIN_DIV.innerHTML += `<div class="col-lg-4 col-sm-6 col-xs-12">
                                        ${cards.cardClient(vacation,'eye',color)}
                                        </div>`
                }
            }
            addEvents();
            const btnOut = document.querySelector('#btnOut');
            btnOut.addEventListener('click',logOut)
        })});
        
}

function addEvents(){
    let eyes = document.getElementsByClassName('follow-btn');
            Object.entries(eyes).map(( eye ) => {
                eye[1].addEventListener("click", function() {
                 const V_ID = Number(this.id.split('_')[1]);
                 follow(V_ID);
                });
            });
}

function follow(v_id){

    fetch(`${SERVER}follow/?vid=${v_id}&uid=${userId}`,{
       method: "PUT",
        headers:{
           'Content-type':'application/json',
           'Authorization': "bearer " + window.sessionStorage.getItem('vacations_t')
    }})
    .then(res=>{res.text()
     .then(res=>{

     })});
}

//socket functions:
function updateLive(v_object){
    let oneDiv = document.querySelectorAll(`div[data-id=data-id_${v_object.id}]`)[0];
    let eyeType = oneDiv.getAttribute('data-eye');
    let color = oneDiv.getAttribute('data-color');
    oneDiv.parentElement.innerHTML = cards.cardClient(v_object,eyeType,color);
    addEvents();
}

function deleteLive(v_id){
    let oneDiv = document.querySelectorAll(`div[data-id=data-id_${v_id}]`)[0];
    oneDiv.parentElement.parentElement.removeChild(oneDiv.parentElement);
}

export default {moveToMainPage:moveToMainPage,appendCards:appendCards,updateLive:updateLive,deleteLive:deleteLive}
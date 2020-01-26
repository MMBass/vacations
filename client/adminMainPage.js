import cards from "./templates/cards.js";
import addVacationWindow from "./templates/addWindow.js";
import logOut from "./logOut.js";

const SERVER = `http://localhost:3000/`;
let openEdit = false;
let dataArr = [];

function moveToMainPage(userName){

    const MAIN_DIV_TEMPLATE = `<div id="mainDiv" class="jumbotron pt-5 row">
      <div class="col-12 bg-primary rounded p-1 pt-2">
        <button id="btnOut" class="float-right btn btn-secondary">log out</button>
      
        <h3 id="admin" class="text-warning col-10">ADMIN</h3>
        <h3 class="col-12">Hello ${userName}</h3>
      </div>
      
        <div id="addingArea" class="row sticky-top position-fixed mt-5">
            <button id="chartBtn" class=" btn btn-warning ">Chart</button>
            <button id="addBtn" class=" btn btn-primary">Add</button>
        </div>
    </div>
    
    <div id="mainDiv" class="jumbotron row pt-5">
  
    </div>`;

    const BODY = document.querySelector('body');
    BODY.innerHTML = MAIN_DIV_TEMPLATE;
    appendCards();
}

function appendCards(){
    const MAIN_DIV = document.querySelector('#mainDiv');

        fetch(`${SERVER}vacations`,{
        method: "GET",
         headers:{
            'Content-type':'application/json',
            'Authorization': "bearer " + window.sessionStorage.getItem('vacations_t')
        }})
       .then(res=>{res.text()
        .then(vacationsArr=>{
            vacationsArr = JSON.parse(vacationsArr);
            dataArr = vacationsArr;

            let colors=['success','primary','warning','info']
            let color= '';
            let counter = 0;
            for(let vacation of vacationsArr){
                if(counter <= 3){
                    color = colors[counter];
                }else if(counter > 3){
                    counter = 0;
                    color = colors[counter];
                }
                counter++;

                MAIN_DIV.innerHTML += `<div class="col-lg-4 col-sm-6 col-xs-12">
                                                  ${cards.cardAdmin(vacation,color)}
                                       </div>`
                
                
            }
            addEvents();
            const addBtn = document.querySelector('#mainDiv #addBtn');
            const chartBtn = document.querySelector('#mainDiv #chartBtn');
            addBtn.addEventListener("click",addV);
            chartBtn.addEventListener("click",openChart);
            const btnOut = document.querySelector('#btnOut');
            btnOut.addEventListener('click',logOut)
        })});
}

function addEvents(){
    let trashes = document.getElementsByClassName('delete-btn');
    Object.entries(trashes).map(( trash ) => {
        trash[1].addEventListener("click", function() {
         const V_ID = Number(this.id.split('_')[1]);
         deleteV(V_ID);
        });
    });
    let pens = document.getElementsByClassName('edit-btn');
    Object.entries(pens).map(( pen ) => {
        pen[1].addEventListener("click", function(event) {
         const V_ID = Number(this.id.split('_')[1]);
         editV(event,V_ID);
        });
    });
}

function deleteV(v_id){
    fetch(`${SERVER}vacations/?vid=${v_id}`,{
        method: "DELETE",
         headers:{
            'Content-type':'application/json',
            'Authorization': "bearer " + window.sessionStorage.getItem('vacations_t')
      }})
     .then(res=>{res.text()
      .then(res=>{
      })});
}

function editV(event,v_id){
  if(openEdit === false){
    openEdit = true;

    let innerParentId= event.target.parentElement.parentElement.id;
    let innerParent = document.getElementById(innerParentId);

    let img = document.querySelector(`#${innerParentId} .img-fluid`);
    img.classList +=" d-none";
    let inputsList = document.querySelectorAll(`#${innerParentId} [contenteditable="false"]`);
    inputsList.forEach((ipt)=>{
        ipt.setAttribute('contenteditable','true');
    });
    document.querySelector(`#${innerParentId} textArea`).classList.remove("d-none");

    innerParent.insertAdjacentHTML('afterbegin', `<div id="editAlert" class="alert alert-danger">Tap on line to edit </div>`);

    event.target.parentElement.innerHTML = `<div id="save-btn_${v_id}" class="edit-btn edit-icon card border-success shadow text-success p-3 rounded-circle position-absolute"><span class="fa fa-save" aria-hidden="true"></span></div>`;

    let saveBtn = document.getElementById(`save-btn_${v_id}`)
    saveBtn.addEventListener('click',function(event){
        saveChanges(v_id);
        changeBack(event,v_id);
    });
  }
}

function changeBack(event,v_id){
    const ALERT = document.querySelector('#editAlert');
    event.target.parentElement.parentElement.removeChild(ALERT)

    let inputsList = document.querySelectorAll(`#innerParent_${v_id} [contenteditable="true"]`);
    inputsList.forEach((ipt)=>{
        ipt.setAttribute('contenteditable','false');
    });
    document.querySelector(`#innerParent_${v_id} textArea`).classList.add('d-none');

    document.querySelector(`#innerParent_${v_id} img`).classList.remove("d-none");

    event.target.parentElement.innerHTML = `<div id="edit-btn_${v_id}" class="edit-btn edit-icon card border-secondary shadow text-secondary p-3 rounded-circle position-absolute"><span class="fa fa-edit" aria-hidden="true"></span></div>`;

    let editBtn = document.getElementById(`edit-btn_${v_id}`)
    editBtn.addEventListener('click', function(event) {
        editV(event,v_id);
       });
    openEdit = false;
}

function saveChanges(v_id){
    const A = document.querySelector(`#innerParent_${v_id} h4`).textContent;
    const B= document.querySelector(`#innerParent_${v_id} h1`).textContent;
    const C= document.querySelector(`#innerParent_${v_id} textarea`).value;
    const D = document.querySelector(`#innerParent_${v_id} p`).textContent;

    fetch(`${SERVER}vacations/?vid=${v_id}`,{
        method: "PUT",
         headers:{
            'Content-type':'application/json',
            'Authorization': "bearer " + window.sessionStorage.getItem('vacations_t')
        },
        body: JSON.stringify({
            desc:A
            ,price:B
            ,img:C
            ,date:D
            }),
        })
       .then(res=>{res.text()
        .then(answer=>{
 
        })});
}

function addV(){
 
    const AA = document.getElementById('addingArea');
    AA.innerHTML = `<button id="cnBtn" class="btn btn-primary">Cancel</button>`;
    AA.innerHTML += addVacationWindow;

    const sendAdd = document.querySelector('#sendAdd');
    sendAdd.addEventListener('click',(e)=>{
        e.preventDefault();
        const A = document.getElementById('descInput').value;
        const B= document.getElementById('priceInput').value;
        const C= document.getElementById('imgInput').value;
        const D = document.getElementById('dateInput').value;

        fetch(`${SERVER}vacations`,{
            method: "POST",
             headers:{
                'Content-type':'application/json',
                'Authorization': "bearer " + window.sessionStorage.getItem('vacations_t')
            },
            body: JSON.stringify({
                desc:A
                ,price:B
                ,img:C
                ,date:D
                }),
            })
           .then(res=>{res.text()
            .then(answer=>{
                done();
            })});
    });

    function done(){
        AA.innerHTML =  `
        <button id="chartBtn" class=" btn btn-warning">Chart</button>
        <button id="addBtn" class="btn btn-primary">Add</button>`;
        const addBtn = document.querySelector('#mainDiv #addBtn');
        const chartBtn = document.querySelector('#mainDiv #chartBtn');
        addBtn.addEventListener("click",addV);
        chartBtn.addEventListener("click",openChart);
    }

    const cnBtn = document.getElementById('cnBtn');
    cnBtn.addEventListener('click',()=>{
       done();
    });
}

function openChart(){
        let followedVacationsArr=[];
        let followersNums = [];
        dataArr.map((v)=>{
            if(Number(v.followers) >= 1){
                followedVacationsArr.push(v.id)
                followersNums.push(v.followers)
            }
        });
        
        const AA = document.getElementById('addingArea');
        AA.innerHTML = `<button id="closeBtn" class="btn btn-warning">Close</button>`;
        AA.innerHTML += `<div id="chartContainer" class=" rounded"><canvas id="myChart" class=""></canvas></div>`;
    
        const closeBtn = document.getElementById('closeBtn');
        closeBtn.addEventListener('click',()=>{
            closeBtn.parentElement.innerHTML =  `
            <button id="chartBtn" class=" btn btn-warning">Chart</button>
            <button id="addBtn" class="btn btn-primary">Add</button>`;
            const addBtn = document.querySelector('#mainDiv #addBtn');
            const chartBtn = document.querySelector('#mainDiv #chartBtn');
            addBtn.addEventListener("click",addV);
            chartBtn.addEventListener("click",openChart);
        });
    
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
        
            // The data for our dataset
            data: {
                labels: followedVacationsArr,
                datasets: [{
                    label: 'number of followers: ',
                    backgroundColor: 'rgb(255, 233, 34)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: followersNums,
                }]
            },
            // Configuration options go here
            options: {}
        });
}

//socket function:
function updateLive(v_object){
    let oneDiv = document.querySelectorAll(`div[data-id=data-id_${v_object.id}]`)[0];
    let color = oneDiv.getAttribute('data-color');
    oneDiv.parentElement.innerHTML = cards.cardAdmin(v_object,color);
    addEvents();
}


export default {moveToMainPage:moveToMainPage,appendCards:appendCards,updateLive:updateLive}
let cardClient = function(vacationObject,eyeType,color){
    return `
         <div data-id="data-id_${vacationObject.id}" data-eye="${eyeType}" data-color="${color}" class="vacation-div row  w-100 mt-4 min-width-460 ">
            <div class="card border-${color} mx-sm-1 p-3">

                <div id="follow-btn_${vacationObject.id}" class="follow-btn card border-${color} shadow text-${color} p-3 top-icon rounded-circle position-absolute">
                <span class=" fa fa-${eyeType}" aria-hidden="true">
                </span>
                </div>

                <div class="card border-${color} shadow text-${color} p-3 small-eye-icon rounded-circle position-absolute"><span class="fa fa-eye" aria-hidden="true"><p class="mt-1">${vacationObject.followers}</p></span></div>
                
                <div class="text-${color} text-center mt-3"><h4>${vacationObject.description}</h4></div>
                <div class="text-${color} text-center mt-2"><p class="h1">Price:</p><h1> ${vacationObject.price}$</h1></div>

            <div class="row">
                <div class="w-50 col-6"><img src="${vacationObject.img}" class="img-fluid rounded border border-${color}" alt="Responsive image"></div>
                <div class="col-6 text-${color} text-center mt-2">
                <h5>Detes:</h5>
                <p>${vacationObject.dates}</p>
                </div>
            </div>
      </div>`;
}

let cardAdmin = function(vacationObject,color){
    return `
         <div data-id="data-id_${vacationObject.id}" data-color="${color}" class="vacation-div  row w-100 mt-5">
            <div id="innerParent_${vacationObject.id}" class="card border-${color} mx-sm-1 p-3">

                <div id="delete-btn_${vacationObject.id}" class="delete-btn btn card border-danger shadow text-danger p-3 top-icon rounded-circle position-absolute">
                <span class=" fa fa-trash" aria-hidden="true">
                </span>
                </div>

                <div id="edit-parent_${vacationObject.id}">
                 <div id="edit-btn_${vacationObject.id}" class="edit-btn btn edit-icon card border-secondary shadow text-secondary p-3 rounded-circle position-absolute"><span class="fa fa-edit" aria-hidden="true"></span></div>
                </div>
                
                <div class="text-${color} text-center mt-3"><h4 contenteditable="false">${vacationObject.description}</h4></div>
                <div class="text-${color} text-center mt-2"><h2>Price:</h2><h1 contenteditable="false"> ${vacationObject.price}</h1><h1>$</h1></div>

            <div class="row">
                <div class="w-50 col-6 row"><textArea class="imgEdit d-none position-absolute col-12 rounded border border-${color}" placeholder="Paste the url here">${vacationObject.img}</textArea><img src="${vacationObject.img}" class="img-fluid rounded border border-${color}" alt="Responsive image"></div>
                <div class="col-6 text-${color} text-center mt-2">
                <h5>Detes:</h5>
                <p contenteditable="false">${vacationObject.dates}</p>
                </div>
            </div>
      </div>`;
}

export default {cardClient:cardClient,cardAdmin:cardAdmin};

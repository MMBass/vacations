const dal = require('./dal');

function checkExist(userInput,cb){
      dal.read( "SELECT `userName`,`admin` FROM `users` WHERE userName = '"+userInput.userName+"'",(returnedArr)=>{
        if(returnedArr.length <= 0){
            addTheUser(userInput,cb);
        }else if(returnedArr.length >= 1){
            cb("exist");
        };
      })
};

function addTheUser(userData,cb){

    const values = `'${userData.userName}','${userData.fullName}','${userData.pass}',${0}`;

    dal.write("INSERT INTO `users`(`userName`, `fullName`, `password`, `admin`) VALUES ("+values+")",(success)=>{
        if(success ===  true){
            cb("notExistYet");
            console.log('user added successfully!')
        }
    })
};

module.exports = {checkExist:checkExist}
const dal = require('./dal');

function checkExist(userInput,cb){
      dal.read( "SELECT `userName`,`admin` FROM `users` WHERE userName = '"+userInput.userName+"'",(err,returnedArr)=>{
        if(returnedArr.length <= 0){
            addTheUser(userInput,cb);
        }else if(returnedArr.length >= 1){
            cb(null,"exist");
        };
      })
};

function addTheUser(userData,cb){

    const values = `'${userData.userName}','${userData.fullName}','${userData.pass}',${0}`;

    dal.write("INSERT INTO `users`(`userName`, `fullName`, `password`, `admin`) VALUES ("+values+")",(err,success)=>{
        if(success ===  true){
            cb(null,"notExistYet");
            console.log('user added successfully!')
        }
    })
};

module.exports = {checkExist:checkExist}
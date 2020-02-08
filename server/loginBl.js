const dal = require('./dal');

function checkExist(userInput,cb){
      dal.read( "SELECT `id`,`userName`,`admin` FROM `users` WHERE userName = '"+userInput.userName+"' AND password = '"+userInput.pass+"'",(err,returnedArr)=>{
        if(returnedArr.length === 1){
            cb(null,{id:returnedArr[0].id,userName:returnedArr[0].userName,admin:returnedArr[0].admin});
        }else{
          cb(null,false)
        };
      })
};

module.exports = {checkExist:checkExist}
const dal = require('./dal');

function getVacationList(u_id,cb){
    dal.read( "SELECT * FROM `vacations` WHERE 1",(returnedArr)=>{
        if(returnedArr.length >=0 ){
            if(u_id !== undefined){
                dal.read( "SELECT `vacation_id` FROM `follows` WHERE user_id="+Number(u_id),(followsArr)=>{
                    cb({returnedArr,followsArr});
              })
            }else{
                cb(returnedArr);
            }
        };
      })
}

function addNewVacation(newData,cb){
    dal.write("INSERT INTO `vacations`(`description`, `price`, `img`, `dates`,`followers`) VALUES ('"+newData.desc+"',"+Number(newData.price)+",'"+newData.img+"','"+newData.date+"',"+0+")",(success)=>{
          if(success != true) console.log(success);
          dal.read( "SELECT * FROM `vacations` WHERE id=(SELECT max(id) FROM `vacations`)",(answer)=>{
              cb(answer);
          })
    });
}

function deleteVacation(v_id,cb){
   dal.remove("DELETE FROM `vacations` WHERE `id`="+v_id,(success)=>{
        if(success != true) console.log(success);
           else answer = v_id;
            cb(answer);
     });
}

function updateVacation(newData,v_id,cb){
    dal.update("UPDATE `vacations` SET `description`='"+newData.desc+"', `price`="+newData.price+", `img`='"+newData.img+"', `dates`='"+newData.date+"' WHERE id="+v_id,(success)=>{
        if(success != true) console.log(success);
          dal.read( "SELECT * FROM `vacations` WHERE id="+v_id+"",(answer)=>{
              cb(answer);
        })
    });
}

module.exports = {getVacationList:getVacationList,addNewVacation:addNewVacation,deleteVacation:deleteVacation,updateVacation:updateVacation}
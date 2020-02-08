const dal = require('./dal');

function getVacationList(u_id,cb){
    dal.read( "SELECT * FROM `vacations` WHERE 1",(err,returnedArr)=>{
        if(returnedArr.length >=0 ){
            if(u_id !== undefined){
                dal.read( "SELECT `vacation_id` FROM `follows` WHERE user_id="+Number(u_id),(err,followsArr)=>{
                    cb(null,{returnedArr,followsArr});
              })
            }else{
                cb(null,returnedArr);
            }
        };
      })
}

function addNewVacation(newData,cb){
    dal.write("INSERT INTO `vacations`(`destination`,`description`, `price`, `img`, `dates`,`followers`) VALUES ('"+newData.dest+"','"+newData.desc+"',"+Number(newData.price)+",'"+newData.img+"','"+newData.date+"',"+0+")",(err,success)=>{
          if(success != true) console.log(success);
          dal.read( "SELECT * FROM `vacations` WHERE id=(SELECT max(id) FROM `vacations`)",(err,answer)=>{
              cb(null,answer);
          })
    });
}

function deleteVacation(v_id,cb){
   dal.remove("DELETE FROM `vacations` WHERE `id`="+v_id,(err,success)=>{
        if(success != true) console.log(success);
           else answer = v_id;
            cb(null,answer);
     });
}

function updateVacation(newData,v_id,cb){
    dal.update("UPDATE `vacations` SET `destination`='"+newData.dest+"',`description`='"+newData.desc+"', `price`="+newData.price+", `img`='"+newData.img+"', `dates`='"+newData.date+"' WHERE id="+v_id,(err,success)=>{
        if(success != true) console.log(success);
          dal.read( "SELECT * FROM `vacations` WHERE id="+v_id+"",(err,answer)=>{
              cb(null,answer);
        })
    });
}

module.exports = {getVacationList:getVacationList,addNewVacation:addNewVacation,deleteVacation:deleteVacation,updateVacation:updateVacation}
const dal = require('./dal');

function follow(v_id,u_id,cb){
    dal.write("INSERT INTO `follows`(`user_id`, `vacation_id`) VALUES ("+u_id+","+v_id+")",(err,success)=>{
        if(success === true){
            dal.update( "UPDATE `vacations` SET `followers`= followers+1 WHERE id="+v_id,(err,success)=>{
                   cb();
            });
        }else if(success === false){
            dal.update( "UPDATE `vacations` SET `followers`= followers-1 WHERE id="+v_id,(err,success)=>{
                if(success === true){
                    dal.remove("DELETE FROM `follows` WHERE `user_id`="+u_id+" AND `vacation_id`="+v_id,(err,success)=>{
                        if(err) console.log(err);
                           else answer = v_id;
                            cb(null);
                     });
                }   
            });
        }
    })
}

module.exports = {follow:follow}
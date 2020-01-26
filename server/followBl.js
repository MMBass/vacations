const dal = require('./dal');

function follow(v_id,u_id,cb){
    dal.write("INSERT INTO `follows`(`user_id`, `vacation_id`) VALUES ("+u_id+","+v_id+")",(success)=>{
        if(success === true){
            dal.update( "UPDATE `vacations` SET `followers`= followers+1 WHERE id="+v_id,(success)=>{
                   cb();
            });
        }
    })
}

module.exports = {follow:follow}
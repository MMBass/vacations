const mysql = require('mysql');

function connection(){
   return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "thirdproject",
      });
}

function read(sql,callBack){
    const con = connection();
    con.query(sql, function (err, result) {
      if (err) {
        callBack(err);
        console.log(err);
      }
      callBack(null,result);
    });
}

function write(sql,callBack){
    const con = connection();
    con.query(sql, function (err) {
      if (err) {
        callBack(err,false);
        console.log(err);
      }
      else callBack(null,true);
    });
}

function update(sql,callBack){
  const con = connection();
  con.query(sql, function (err) {
    if (err) {
      callBack(err);
      console.log(err);
    }
    else callBack(null,true);
  });
}

function remove(sql,callBack){
  const con = connection();
  con.query(sql, function (err) {
    if (err) {
      callBack(err);
      console.log(err);
    }
    else callBack(null,true);
  });
}

module.exports = {read : read , write : write, update:update, remove:remove}
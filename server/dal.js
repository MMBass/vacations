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
      if (err) throw err;
      callBack(result);
    });
}

function write(sql,callBack){
    const con = connection();
    con.query(sql, function (err) {
      if (err) console.log(err);
      else callBack(true);
    });
}

function update(sql,callBack){
  const con = connection();
  con.query(sql, function (err) {
    if (err) console.log(err);
    else callBack(true);
  });
}

function remove(sql,callBack){
  const con = connection();
  con.query(sql, function (err) {
    if (err) throw err;
    else callBack(true);
  });
}

module.exports = {read : read , write : write, update:update, remove:remove}
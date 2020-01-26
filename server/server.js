const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
var jwt = require('jsonwebtoken');

const LOGIN_BL = require('./loginBl');
const SIGN_BL = require('./signBl');
const VACATIONS_BL = require('./vacationsBl');
const FOLLOW_BL = require('./followBl');

const PORT = 3000;

app.use(cors())
app.use(express.json())
app.use(express.static('../client'));

app.use((req,res,next)=>{
   if(req.path === '/login' || req.path === '/sign' || req.path === '/load' || '/socket.io.js.map'){
     next();
   }else{
      token = req.headers.authorization.split(" ")[1];
      try{
         jwt.verify(token,'shhhh')
         next();
      }catch{
         res.status(403).send();
      }
   }
});

app.get('/load',function(req,res){
   try{
      let token = req.headers.authorization.split(" ")[1];
      token = jwt.verify(token,'shhhh');
      res.send(token);
   }catch{
      res.status(403)
   }
});

app.post('/login',function(req,res){
   let userInput = req.body;
   
   LOGIN_BL.checkExist(userInput,(answer)=>{
      if(answer.userName){
         answer.token = jwt.sign(
            {
               userName:answer.userName,
               password:userInput.pass
            },
            'shhhh',
            {
               expiresIn: 60*60,
            }
         )
      }
      res.send(answer);
   });
});

app.post('/sign',function(req,res){
   let userInput = req.body;
   SIGN_BL.checkExist(userInput,(answer)=>{
      res.send(answer);
   });
});

app.get('/vacations',function(req,res){
   VACATIONS_BL.getVacationList(req.query.uid,(answer)=>{
      res.send(answer);
   });
});

app.post('/vacations',function(req,res){
      VACATIONS_BL.addNewVacation(req.body,(answer)=>{
         res.send(answer);
      });
});

app.put('/vacations',function(req,res){
   VACATIONS_BL.updateVacation(req.body,req.query.vid,(answer)=>{
            io.emit("update_v",answer);
   });
});

app.delete('/vacations',function(req,res){
   VACATIONS_BL.deleteVacation(req.query.vid,(answer)=>{
      res.send(answer);
   });
});

app.put('/follow',function(req,res){
   FOLLOW_BL.follow(req.query.vid,req.query.uid,(answer)=>{
      res.send(answer);
   });
});


http.listen(PORT, ()=>console.log(`listening on port ${PORT}...`));
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database.js")

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

app.get("/api/cheeses/", (req, res) => {
  var params = []

  let taste = req.query.taste;
  let strength = req.query.strength;
  let hardness = req.query.hardness;
  let name = req.query.name;

  let sql = `select * from cheeses `

  if(taste || strength || hardness || name ){
    sql += `where`  

    if(name){
      sql +=` name like '%${name}%'`
    }else{
      sql +=` name like '%'`
    }
   
    if(taste){
      sql += ` and taste = '${taste}'`
    }

    if(strength){
      sql += ` and strength = '${strength}'`
    }

    if(hardness){
      sql += ` and hardness = '${hardness}'`
    } 
  }

  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json(
          {
          "error":err.message,
          "Query was":sql
         });
        return;
      }
      res.json({
          message:"success",
          "Query was":sql,
          data:rows
      })
  });
});

//id
app.get("/api/cheeses/:id", (req, res) => {
  var sql = "select * from cheeses where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":row
      })
    });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});



// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});









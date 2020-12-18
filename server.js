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

  if(taste !== undefined || strength !== undefined || hardness !== undefined || name !== undefined){
    sql += `where`  

    if(taste === undefined){
      sql += ` taste like '%'`      
    }  else {
      sql += ` taste = '${taste}'`
    }

    if(strength === undefined){
      sql += ` and strength like '%'`
    }  else {
      sql += ` and strength = '${strength}'`
    }

    if(hardness === undefined){
      sql += ` and hardness like '%'`
    }  else {
      sql += ` and hardness = '${hardness}'`
    }

    if(name === undefined){
      sql += ` and name like '%'`
    }  else {
      sql += ` and name like '%${name}%'`
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









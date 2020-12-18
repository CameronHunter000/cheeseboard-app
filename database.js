var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE cheeses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            description text, 
            taste text, 
            hardness text, 
            strength text,
            picture text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO cheeses (name, description, taste, hardness, strength, picture) VALUES (?,?,?,?,?,?)'
                db.run(insert, ["stilton","stilton is a cheese","bitter","soft","strong","https://cdn.cheesemonthclub.com/media/catalog/product/cache/e2cefd84589f5f5814f7192c5e7f1c4d/s/t/stilton-1.jpg"])
            }
        });  
    }
});


module.exports = db
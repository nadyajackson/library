const express = require('express');
const mysql = require('mysql2');
const path = require('path')

const db = mysql.createConnection({
    host: 'mysql2://be9fc529dcb01c:1d29fb21@us-cdbr-east-05.cleardb.net/heroku_4fb321718508f4c?reconnect=true',
    user: 'be9fc529dcb01c',
    password: '1d29fb21',
    database: 'heroku_4fb321718508f4c'
});

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'WEEK6'
// });

db.connect((err) =>{
    if(err) throw err;
    console.log("Connection to MySQL successful")
});

const app = express();
//CREATE DATABASE
app.get('/createDB', (req, res) => {
    let myQuery = "CREATE DATABASE WEEK6"
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Database Created");
    })
})

//CREATE TABLE
app.get('/createTable', (req, res) => {
    let myQuery = "CREATE TABLE knickknackshop (sku INT auto_increment, product VARCHAR(100), color VARCHAR(50), inventoryCount INT, PRIMARY KEY (sku) )"
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Table Created")
    })
})

//INSERT
app.get('/insertFirst', (req, res) => {
    let post = `product: '${req.body.product}', color: '${req.body.color}', inventoryCount: '${req.body.inventoryCount}'`;
    let myQuery = "INSERT INTO knickknackshop SET ?";
    db.query(myQuery, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send('First row successful')
    })
})
app.get('/insertSecond', (req, res) => {
    let post = req.body;
    console.log(req.body, "second")
    let myQuery = "INSERT INTO knickknackshop SET ?";
    db.query(myQuery, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send(result)
    })
})

//GET
app.get('/displayRows', (req, res) => {
    let myQuery = "SELECT * FROM knickknackshop";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        res.send(result)
    })
})
app.get('/getOne/:sku', (req, res) => {
    let myQuery = `SELECT * FROM knickknackshop WHERE sku = ${req.params.sku}`;
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        res.send(result)
    })
})

//UPDATE
app.get('/updateRow/:sku', (req, res) => {
    let newStuff = req.body
    let myQuery = `UPDATE knickknackshop SET ${newStuff} WHERE sku = ${req.params.sku} `;
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send(result)
    })
})

//DELETE
app.get('/deleteRow/:sku', (req, res) => {
    let myQuery = `DELETE FROM knickknackshop WHERE sku= ${req.params.sku}`;
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result)
        res.send("Delete Successful")
    })
})

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    app.use(express.static('build'));
  
    // Express serve up index.html file if it doesn't recognize route
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
  }
  const PORT = process.env.PORT || 9000;


app.listen(PORT, () => { 
    console.log(`The App is listening on port ${PORT}`)
});
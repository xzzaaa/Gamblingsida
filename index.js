const express = require('express')
const app = express();
const port = 3000;
const mysql = require("mysql2/promise")
const dotenv = require("dotenv").config()
const dataBasConn = require("./databaseUsers");
const bcrypt = require("bcrypt");


const conn = mysql.createPool({
    host: process.env.DV_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

app.use(express.urlencoded({extended:false}));



app.set('view engine', 'ejs');

app.use('/public', express.static('public'))


app.get('/', async function(req,res) {

    const test = await conn.query(`
        SELECT * FROM users`,)

        console.log(test);

    res.render('index');
});

app.get('/login', function(req,res) {
    res.render('login');
});

app.get('/signup', function(req,res) {
    res.render('register');
});

app.post("/login", async function (req, res) {
    console.log(req.body)
    let email = req.body.email
    let user = await dataBasConn.getUser(email)

    let test = await bcrypt.compare(req.body.password, user.password)
    console.log(test)
    if(test == true){
        res.render("inder")
    } else {
        res.redirect('/')
    }
})


app.post('/signup', async function(req, res) {

    const validprnr = checkPersnr(req.body.personnr)
    if(validprnr == true){
        let result = await dataBasConn.addUser(req.body.email, req.body.password, req.body.personnr, req.body.name, req.body.telefon, req.body.address);
        if (result.affected_rows == 1){
        res.render("login")}
        else {
            res.render("register")
        }
    }

});

function checkPersnr(personnr){
    let nrs = personnr.split('');
    let check = 0;
    for(let i = 0; i < 9;i++){
        let add = nrs[i] * (((i+1) % 2) + 1)
        check += add % 10        
        if (add > 9){
            check += 1    
        }
    }
    if((10 - (check % 10)) % 10 == personnr[9]){
        return true;
    } else {
        return false;
    }
}


app.listen(port, function(){
    console.log(`Servern körs på http://localhost:${port}`);
});
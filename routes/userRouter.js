const express = require('express');
const router = express.Router();
const dataBasConn = require("../databaseUsers");
const bcrypt = require("bcrypt");


router.get('/login', function(req,res) {
    res.render('login');
});

router.get('/signup', function(req,res) {
    res.render('register');
});

router.get('/settings', async function(req,res) {
   let user = await dataBasConn.getUser(req.session.user.id);
   res.render('settings', {user});

});

router.get('/games', async function(req,res) {
    let user = await dataBasConn.getUser(req.session.user.id);
    res.render('games', {user});
 
 });

 router.get('/gamescript.js', async function(req,res) {
    let user = await dataBasConn.getUser(req.session.user.id);
    res.render('games', {user});
 
 });

router.post('/settings', async function(req,res) {
    let user = await dataBasConn.getUser(req.session.user.id);
    let addedMoney = Number(req.body.funds);
    if(!isNaN(addedMoney) && addedMoney > 0){
        let newMoney = Number(req.body.funds) + user.cash;
        let update = await dataBasConn.updateFunds(newMoney, req.session.user.id);
        user.cash = newMoney;
        user.msg = "Now you can gamble more!";
        console.log(update); 
    } else {
        user.msg = "use real money idiot";
    }
res.render('settings', {user})
    });

router.post("/login", async function (req, res) {
    let user = await dataBasConn.getUser(req.body.email);
    console.log("?")
    if(await bcrypt.compare(req.body.password, user.password)){
        req.session.user = {id:user.email};
        console.log("yes")
        res.redirect('/');
    }else {
        console.log("nope")
        res.render('login', {msg: "please try again"});
    }
});


router.post('/signup', async function(req, res) {

    const validprnr = checkPersnr(req.body.personnr)
    if(validprnr == true){
        let result = await dataBasConn.addUser(req.body.name, req.body.email, req.body.password, req.body.personnr, req.body.telefon, req.body.address);
        console.log(result)
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

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session: ", err);
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // Clear the cookie that holds the session ID
        res.redirect('/login'); // Redirect to login page after logging out
    });
});

module.exports = router;
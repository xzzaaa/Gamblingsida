const express = require('express');
const router = express.Router();
const dataBasConn = require("../databaseUsers");

router.get('/games', function(req,res) {
res.render('games');
});

router.get('/register-game', function(req,res){
res.render('register-game');
})

router.get('/addGames', function(req,res){
    res.render('register-games');
});

router.post('/addGames', async function(req,res){
    let result = await dataBasConn.addGame(req.body.name, req.body.stats, req.body.chance);
    console.log(result)
    if (result.affectedRows == 1){
        res.render("games")
    }
});

router.get('/games/:game', async function(req, res){
    res.send(reg.param.game)
});

module.exports = router;
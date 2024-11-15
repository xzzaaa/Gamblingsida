const express = require('express')
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use('/public', express.static('public'))


app.get('/', function(req,res) {
    res.render('index');
});

app.listen(port, function(){
    console.log(`Servern körs på http://localhost:${port}`);
});
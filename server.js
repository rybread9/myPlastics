const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Plastics = require('./models/plastics.js')

const db = mongoose.connection

const PORT = 3000

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))


const usersPlastics = [];

// index page
app.get('/myPlastics', (req, res)=>{
  Plastics.find({}, (error, allPlastics)=>{
    res.render('index.ejs', {
      plastics: allPlastics
    })
  })

})

// create new user plastics data
app.post('/myPlastics', (req, res)=>{
  Plastics.create(req.body, (error, createdPlastics)=>{
    console.log(req.body);
    usersPlastics.push(req.body);
    res.redirect('/myPlastics')
  })
})

// render new user plastics data in a chart


// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', 'mongodb://localhost/myPlastics'));
db.on('disconnected', () => console.log('mongo disconnected'));


mongoose.connect('mongodb://localhost/myPlastics', {useNewUrlParser:true})
mongoose.connection.once('open', ()=>{
  console.log('connected to mongo');
})

app.listen(PORT, ()=>{
  console.log('listening on port 3000...');
})

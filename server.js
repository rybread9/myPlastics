const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Plastics = require('./models/plastics.js')
const topTen = require('./models/data.js')

const db = mongoose.connection
const PORT = process.env.PORT || 3000


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

// index page
app.get('/myPlastics', (req, res)=>{
    res.render('index.ejs')
})

// community list page
app.get('/myPlastics/community', (req,res)=>{
  Plastics.find({}, (error, allPlastics)=>{
    res.render('community.ejs', {
      plastics: allPlastics
    })
  })
})


app.get('/plastics', (req, res)=>{
  res.json(Plastics)
})

// get topTen chart data
app.get('/topTen', (req,res)=>{
    res.json(topTen)
})

// create new user plastics data
app.post('/myPlastics/form', (req, res)=>{
  Plastics.create(req.body, (error, createdPlastics)=>{
    // res.redirect('results.ejs', {
    //   plastics: createdPlastics

    // })
    // console.log(createdPlastics);
  res.redirect('/myPlastics/' + createdPlastics._id)
  })
})

// get the user input page
app.get('/myPlastics/form', (req,res)=>{
  Plastics.find({}, (error, userPlastics)=>{
    res.render('form.ejs', {
      plastics: userPlastics
    })
  })
  // res.render('form.ejs')
})

// render new user plastics data in a chart
app.get('/myPlastics/:id', (req, res)=>{
  Plastics.findById(req.params.id, (err, foundPlastics)=>{
    // console.log(foundPlastics);
    if (err) {
      console.log(err);
    }
    res.render('results.ejs', {
      plastics: foundPlastics
    })
  })
})


// app.get('/plasticsJson/:id', (req, res)=>{
//   Plastics.findById(req.params.id, (err, foundPlastics)=>{
//     console.log(foundPlastics);
//     res.json(foundPlastics)
//   })
// })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', 'mongodb://localhost/myPlastics'));
db.on('disconnected', () => console.log('mongo disconnected'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/myPlastics'

mongoose.connect(MONGODB_URI, {useNewUrlParser:true})
mongoose.connection.once('open', ()=>{
  console.log('connected to mongo');
})

app.listen(PORT, ()=>{
  console.log('listening on port 3000...');
})

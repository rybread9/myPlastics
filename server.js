const express = require('express');
const app = express();

app.get('/myPlastics', (req, res)=>{
  res.render('index.ejs')
})

app.listen(3000, ()=>{
  console.log('listening on port 3000...');
})

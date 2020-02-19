const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

//const config = require('./config/config');
const routes = require('./routes/routes');
const repository = require('./repositories/userRepository');

const app = express();
const PORT = process.env.PORT; //config.PORT
const DB = process.env.DATABASE_URL; //config.DB


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, 
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));  

app.use('/users', routes);
app.get('/', (req, res) =>{
    res.send('user app');
})

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    repository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id${id}`)
    })
    res.redirect('/');
})


// get all User items in the db
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    repository.locate(id).then((userData) => {
      res.render('edit', {userData});
      console.log('User: ' + userData);
    }).catch((error) => console.log(error));
  });
  
  // add a User item
  app.post('/edit', (req, res) => {
    const id = req.body.id;
    const userData = {
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        age: req.body.age
    };
    repository.updateById(id, userData).then((User) => {
        console.log(User);
        res.redirect('/');
    }).catch((error) => console.log(error));
  });

  //search page
  app.get('/search', (req, res) => {
      res.render('search');
  })
  app.post('/search', (req, res) => {
      const query = req.body.query;
      repository.search(query).then((Users) => {
          res.render('searchResults', {Users});
      }).catch((error) => console.log(error));
  })
  app.post('/sort', (req, res) => {
      const how = req.body.sortMethod;
      const by = req.body.sortBy;
      repository.sortBy(how, by).then((Users) => {
        res.render('viewUsers', {Users});
        console.log("Sorted queries: \n" + how + '\n' + by);
      }).catch((error) => console.log(error));
  })

app.listen(PORT, ()=>{
    console.log(`app server is listening on port: ${PORT}`);
}); 
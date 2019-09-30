const { dbSequelize } = require('./lib/Seq_Models/userModel');

const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Shop = require('./models').Shop;
const Coffee = require('./models').Coffee;

/**  Inserting data into the table
Shop.create({
   name: 'Starbucks'
}).then(shop => {
   shop.createCoffee({
       name: 'Columbian',
       type: 'Dark'
   }).then(() => console.log('Worked..!!'));
});
*/


const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');




const router = require('./lib/routes/index');
router.init(app);

// dbSequelize();

// Routes
app.get('/', (req, res) => {
    Shop.findAll({
        include: [Coffee]
    }).then(shops => {
        res.render('index', { shops: shops })
    });
});



module.exports = app;
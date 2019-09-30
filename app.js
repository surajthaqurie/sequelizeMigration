/** This is for Simple Sequelize without CLI.
 * const { dbSequelize } = require('./lib/Seq_Models/userModel');
 */
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

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const router = require('./lib/routes/index');
router.init(app);


/** This is for Simple Sequelize without CLI
 *  dbSequelize(); 
 */

// Routes
app.get('/', (req, res) => {
    Shop.findAll({
        include: [Coffee]
    }).then(shops => {
        res.render('index', { shops: shops })
    });
});

app.post('/shops', (req, res) => {
    Shop.create(req.body)
        .then(() => res.redirect('/'));
});

app.post('/coffee/:shop_id', (req, res) => {
    Coffee.create({ ...req.body, shopId: req.params.shop_id })
        .then(() => res.redirect('/'));
});


module.exports = app;
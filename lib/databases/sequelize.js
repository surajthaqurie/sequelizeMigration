const Sequelize = require('sequelize');

module.exports = new Sequelize("mysql://root:rootpassword@localhost:3306/test_db", { logging: false });



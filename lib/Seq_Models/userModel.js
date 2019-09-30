const sequelize = require('../databases/sequelize');
const Sequelize = require('sequelize');


exports.dbSequelize = () => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING,

        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            lowNull: false,
            validate: {
                isEmail: true
            }
        }
    },
        {
            // Model tableName will be the same as the model name
            freezeTableName: true

        });

    User.sync(/** { force: true } */).then(() => {
        console.log('Table is created on Sql');
        return User.create({
            firstName: 'John',
            lastName: 'Hancock',
            email:'test@gmail.com'

        });
    }).catch((err) => {
        console.log('Table is not Created..', err);
    });

}
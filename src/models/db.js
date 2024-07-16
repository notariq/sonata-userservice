const Sequelize = require('sequelize');
/*
const config = require('./config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
});
*/
const databaseUrl = process.env.DATABASE_URL || 'postgres://notariq:kogontogol@localhost:5432/user-sonata';

// Create a new Sequelize instance
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  protocol: 'postgres'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);

module.exports = db;
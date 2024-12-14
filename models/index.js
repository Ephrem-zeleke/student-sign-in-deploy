// this will figure out which database to connect to and manage the database
// this will be in charge of keeping track of the model the app uses
const { Sequelize, DataTypes } = require('sequelize')

const configJson = require('../config.json')

const createStudentModel = require('./student.js')

// look for an environment variable will be called NODE_ENV and read its value
//environment variables are set for your whole computers
// any application running on this computer or server can read these environment variable
// at azure, we'll create an environment variable for your serve called NODE_ENV and set it to "production"

const env = process.env.NODE_ENV || 'development'

const config = configJson[env] // this line will read the configuration of the object based on env or development

const sequelize = new Sequelize(config)

//let's set up the sequelize object
// new variable for the database
const database = {
    sequelize: sequelize,
    Sequelize: Sequelize
}
//
const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name // 'student'
database[studentModelName] = studentModel

module.exports = database

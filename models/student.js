// this will have our student model
module.exports = (sequelize, DataTypes) =>{
    // this will define the model
    const Student = sequelize.define('Student', {
        // this will define columns in the database - give them a name and a type
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty: false  // validate to not enter an empty string
            }
        },
        starID:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                notEmpty: false
            }
        },
        present:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            default: false
        }
    })
    // create or update table in the database
    Student.sync({ force: false }).then(() =>{
        console.log('Synced student table')
    })

    return Student
}
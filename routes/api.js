const express = require('express')

const database = require('../models')

const Student = database.Student  // the student model

const router = express.Router()

router.get('/students', function(req, res, next){

    // it is a query database and get all the data from the row
    // convert to json form
    //available in the then function
    Student.findAll({order:['name']}).then(students => { // this one also help us order the list by name
        return res.json(students)
    })
})


// add data to the table

router.post('/students', function(req, res, next){
    const newStudent = req.body
    Student.create(newStudent).then(result => {
        return res.status(201).send('New student created')
    }).catch(err =>{
        // 400 means bad request which means client or user send bad data
        //return res.status(400).send('invalid data')
        if(err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        }else{
           return next(err)
        }
    })
})

// route handler
router.patch('/students/:id', function(req, res, next){
    //matches request to /students1, students2, or students100, or whatever id number we are patching
    // req.params will store the id value
    const studentID = req.params.id
    const updatedStudent = req.body  // updated data about this student
    console.log(updatedStudent)
    Student.update(updatedStudent, {where: {id:studentID}}).then( ( result ) => {
        const rowsModified = result[0] //if 1 row was changed, we found the student and they were updated
        if(rowsModified ===1){
            return res.send('ok')
        }
        else{ // if 0 rows were updated, student was not found
            return res.status(404).send('student not found')
        }
          // status is 200 by default
    }).catch(err =>{
        // 400 means bad request which means client or user send bad data
        //return res.status(400).send('invalid data')
        if(err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        }else{
           return next(err)
        }// this is for database error

    })
    // now we need to set an error handling method since we may have an error like
    // student id that doesn't exist
    // invalid data in the update student
    // database problem like app can't connect to the database

})

router.delete('/students/:id', function(req, res, next){
    // a delete request to api will delete the student with the id
    const studentID = req.params.id
    Student.destroy({where:{id:studentID}}).then( ( rowsDeleted ) => {

        if(rowsDeleted ===1){
            return res.send('Student deleted')
        }else{
            return res.status(404).send('student not found')
        }
    }).catch(err =>{
        return next(err)
    })
})

module.exports = router




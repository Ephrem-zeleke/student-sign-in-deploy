// this file will be our stored for our data
// import some library from the pinia and vue for ref data

import { defineStore } from 'pinia'
import { ref, computed} from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', () =>{

    // the data stored here will be used by our components
    // let's assign a variable for student list and put some example data

    const sortedStudents = ref([])

    const mostRecentStudent = ref({})  // this will be an object

    const addNewStudentErrors = ref([])  // this will store an error if there is an error when we try to add a student


    function getAllStudents() {
        // make an api request to get all the student and save them in the store
        studentAPI.get().then(students => {  // students is the JSON response from the api
            sortedStudents.value = students
        }).catch(err =>{
            console.log(err)
        })
    }

    // the store can also write a function that add the student to the student list

    function addNewStudent(student){
        // make api call to add a new student
        // call getAllStudent to re-request list of students from the api server
        studentAPI.post(student).then(() => {
            getAllStudents()
        }).catch(err =>{
            addNewStudentErrors.value = err.body
        })

    }
    // we add a function to delete a student
    function deleteStudent(studentToDelete) {
        // make api request
        const deleteStudentAPI = mande(`api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then(() => {
            mostRecentStudent.value = {}
            getAllStudents()
        }).catch(err =>{
            console.log(err)
        })
    }
    // we also need the store to know when the student arrive or leave
    // so let's create a function for student arrive or left
    function arrivedOrLeft(student) {
        // mostRecentStudent.value = student
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then(() => {
            mostRecentStudent.value = student
            getAllStudents()
        }).catch(err =>{
            console.log(err)
        })
    }
    // student store also works with computed properties
    const studentCount = computed(() => {
        return sortedStudents.value.length
    })



    return {
        // will return reactive value here
        //studentList,
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,


        // will return function here
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,
        getAllStudents,

        // computed property
        studentCount,


    }
})
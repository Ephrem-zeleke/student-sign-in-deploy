<script setup>
// we have to import the ref library from the vue

import { ref, watch } from 'vue'

import { useStudentStore} from "./stores/StudentStore.js"
import { storeToRefs } from "pinia";

const studentStore = useStudentStore()



// all the code will be here
const newStudentName = ref('')
const newStarID = ref('')

const formError = ref([])

const { addNewStudentErrors } = storeToRefs(studentStore)

watch( addNewStudentErrors, () =>{
  if (addNewStudentErrors.value){
    alert(addNewStudentErrors.value.join('\n'))
  }
})

// copy the addStudent function here

function addStudent(){

  formError.value = []

  // here let's check if there is a value at the new student name and star id
  // if there is no a value, put there error message in the form array
    if (newStudentName.value.length == 0){
      formError.value.push('student name must be entered')
    }
    if (newStarID.value.length == 0){
      formError.value.push('starID must be entered')
    }
    if(formError.value.length == 0){
      let student = {
        name: newStudentName.value,
        starID: newStarID.value,
        present: false
      }

      //todo how to add the student list
      studentStore.addNewStudent(student)

      newStudentName.value = ''
      newStarID.value = ''

    }
  // adding a computed property to sort the student list in alphabetic order and count the number of students in the class
  //create a function that sort the student in alphabetical order
}


</script>


<template>

<!--  all the HTML file will goes here -->
  <div id="new-student-form-errors" class="m-2">
    <!-- TODO show errors from form validation -->
    <div v-if="formError.length > 0" class="alert alert-danger">
      <li v-for="error in formError" v-bind:key="error">
        {{ error }}
      </li>

    </div>

  </div>


  <div id="new-student-form" class="card add-student m-2 p-2">


    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <!-- TODO v-model newStudentName -->
      <input v-model.trim="newStudentName" id="name" class="form-control">
      <!--let's work on adding a new student and we use v-model to bind the data two way       -->
    </div>

    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <!-- TODO v-model newStarID -->
      <input v-model.trim="newStarID" id="starID" class="form-control">
    </div>

    <!-- TODO v-on:click event handler
    the button should add the new student and their id to the list and we can do using the v-on function and it will
    listen the click event -->
    <button v-on:click="addStudent" class="btn btn-primary">Add</button>
  </div>

</template>


<style scoped>


/*  all the style that will apply to the component will be here */

</style>

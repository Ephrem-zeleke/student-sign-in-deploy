<script setup>

// all the code will be here
// get the student data from the store
import {useStudentStore} from "./stores/StudentStore.js";

import {storeToRefs} from 'pinia'

import { computed } from 'vue'

const studentStore = useStudentStore()

const {sortedStudents, studentCount} = storeToRefs(studentStore)

// assign a variable for delete student that delete the students when the delete button clicked.
const deleteStudent = (student) =>{
  studentStore.deleteStudent(student)
}

const arrivedOrLeft = (student) => {
  studentStore.arrivedOrLeft(student)
}

const pluralStudentMessage = computed(() =>{
  if (studentCount.value === 1){
    return 'There is 1 student in class'
  }else{
    return `There are ${studentCount.value} students in class`
  }

})

</script>

<template>

  <!--  all the HTML file will goes here -->
<!--  copy the student table from the previous code -->
  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted">{{ pluralStudentMessage }}</h5>
    <div id="student-table">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
          <th>Delete?</th>
        </tr>
        </thead>

        <tbody>
        <!-- add the students data to the table and we don't know how many students we have so we will use the for loop
        to loop over the students list. we use the v-for library from the vue -->
        <tr v-for="student in sortedStudents" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.starID }}</td>
          <td>
            <input type="checkbox" v-model="student.present" v-on:change="arrivedOrLeft(student)">
            <!--we need to display a message saying welcome or goodbye for the most recent student added or leave.
             we can do that using the v-on:change and write a function that figure out the most recent student added or leave-->
            <span v-if="student.present" class="mx-3" >Here!</span>
            <!--now we can add a function called arriveOrLeft in the script and work on it-->
            <span v-else class="mx-3"> Not present </span>
          </td>
          <td>
            <button v-on:click="deleteStudent(student)" class="btn btn-danger"><i class="bi bi-trash-fill"></i> Delete</button>
          </td>

        </tr>
        <!-- TODO create table rows
        Each row will have a checkbox, bound to the app's data
        When the checkbox is checked/unchecked,
        the student will be signed in/out -->

        </tbody>

      </table>
    </div>
  </div>

</template>


<style scoped>

/* all the style that will apply to the component will be here */
#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}


</style>

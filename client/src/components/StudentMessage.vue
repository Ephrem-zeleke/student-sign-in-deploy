<script setup>

// all the code will be here
// let's import the student store and change data to refs
import {useStudentStore} from "./stores/StudentStore.js"
import {storeToRefs} from "pinia"

const studentStore = useStudentStore()

const { mostRecentStudent } = storeToRefs(studentStore)
</script>


<template>

  <!--  all the HTML file will goes here -->
 <div id="welcome-or-goodbye-message" class="m-2">

    <!-- TODO show a message when student arrives or leaves  -->
    <div v-if="mostRecentStudent.name">
      <div v-if="mostRecentStudent.present" class="alert alert-success">
        Welcome, {{ mostRecentStudent.name }}!
      </div>
      <div v-else class="alert alert-info">
        Goodbye, {{ mostRecentStudent.name }}. see you later!!
      </div>

    </div>


  </div>


</template>


<style scoped>

/* all the style that will apply to the component will be here */

</style>

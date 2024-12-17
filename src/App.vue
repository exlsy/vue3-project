<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- <router-link class="navbar-brand" to="/">Home</router-link> -->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">Home</router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <!-- <router-link class="nav-link" to="/todos">Todos</router-link> -->
        <router-link class="nav-link" :to="{ name: 'Todos' }">Todos</router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
// import { ref, computed, watch } from 'vue';
// import TodoSimpleForm from './components/TodoSimpleForm.vue';
// import TodoList from './components/TodoList.vue';
// import axios from 'axios';

export default {
}
</script>

<style>
/* .name {
  color: red;
} */
 .todo {
  color: gray;
  text-decoration: line-through;
 }
</style>


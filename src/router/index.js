import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../pages/Home.vue';
import Todos from '../pages/todos/Todos.vue';
import Todo from '../pages/todos/_id.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos,
    },
    {
      path: '/todos/:id',
      name: 'Todo',
      component: Todo,
    },
  ],
});

// 1 / 
// 2 /todos 
// 3 /todos/create
// 4 /todos/:id

export default router;


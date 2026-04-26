import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Details from '@/views/Details.vue'
import AddStudent from '@/views/AddStudent.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home},
        { path: '/details/:id', component: Details},
        { path: '/add-student', component: AddStudent}
    ]
})

export default router

const router = [
    {
        path: '/user',
        name: 'User',
        component: () => import('./user.component.vue')
    }
]

export default router
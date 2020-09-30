const routes = [
    // /user => lista os user
    {
        path: '/user',
        name: 'user',
        component: () => import('./user.component.vue')
    },
    {
        // /user/1 => apresenta o user 1
        path: '/user/:userId',
        props: true,
        component: () => import('./user.detail.component.vue'),
        children: [
            {
                // /user/1/edit => edita o user 1
                path: 'edit',
                props: true,
                component: () => import('./user.edit.component.vue')
            },
            {
                // /user/1/delete => deleta o user 1
                path: 'delete',
                props: true,
                component: () => import('./user.delete.component.vue')
            }
        ]
    }
]

export default routes

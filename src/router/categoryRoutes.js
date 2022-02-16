export default [{
        path: '/',
        name: 'all',
        component: () => import('../views/category/All'),

    }, {
        path: 'makeup',
        name: 'makeup',
        component: () => import('../views/category/Makeup'),
    }, {
        path: 'skincare',
        name: 'skincare',
        component: () => import('../views/category/Skincare'),
    }, {
        path: 'fragrance',
        name: 'fragrance',
        component: () => import('../views/category/Fragrance'),
    }, {
        path: 'others',
        name: 'others',
        component: () => import('../views/category/Others'),
    },
   

]
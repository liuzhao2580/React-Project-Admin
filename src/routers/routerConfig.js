import layout from '@/layout'
import dashboard from '@/views/dashboard'
import document from '@/views/document'
import Login from '@/views/login'
export const constRoutes = [
    {
        path:'/login',
        component:Login,
    },
    {
        path:'/',
        component: layout,
        routes: [
            {
                path:'/dashboard',
                component: dashboard,
            },
            {
                path:'/document',
                component: document
            }
        ]
    }
]
export const asyncRoutes = [
    {
        path:'/',
        component:'@/layout',
        routes: [
            {
                path:'/dashboard',
                component:'@/views/dashboard',
            },
            {
                path:'/About',
                component:'@/views/About',
            }
        ]
    }
]
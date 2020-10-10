import layout from '@/layout'
import dashboard from '@/views/dashboard'
import about from '@/views/about'
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
                path:'/about',
                component:about,
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
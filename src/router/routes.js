import Home from '@/components/Home'
import CreatePoll from '@/components/CreatePoll'
import SignIn from '@/components/SignIn'
import EmailConfirm from '@/components/EmailConfirm'
import Polls from '@/components/Polls'
import Poll from '@/components/Poll'
import JoinPoll from '@/components/JoinPoll'

export default [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/emailconfirm',
        name: 'EmailConfirm',
        component: EmailConfirm
    },
    {
        path: '/create',
        name: 'CreatePoll',
        component: CreatePoll,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/polls',
        name: 'Polls',
        component: Polls,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/poll',
        name: 'Poll',
        component: Poll,
        props: (route) => ({
            id: route.query.id,
        }),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/join/:id',
        props: true,
        name: 'JoinPoll',
        component: JoinPoll,       
    }
]


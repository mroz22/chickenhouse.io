import Users from '@/modules/users/views/Users'
import User from '@/modules/users/views/User'

const routes = [{
  path: '/users',
  component: Users,
  meta: { requiresAuth: true }
}, {
  path: '/users/:uid',
  component: User,
  meta: { requiresAuth: true }
}]

export default routes

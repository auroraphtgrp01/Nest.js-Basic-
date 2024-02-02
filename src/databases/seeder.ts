export const INIT_PERMISSIONS = [
  {
    name: 'Create new User From Admin',
    apiPath: '/users',
    method: 'POST',
    module: 'USER',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.474Z',
    updatedAt: '2024-01-31T08:32:13.474Z',
    __v: 0
  },
  {
    name: 'Get all User From Admin',
    apiPath: '/users',
    method: 'GET',
    module: 'USER',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.801Z',
    updatedAt: '2024-01-31T08:32:13.801Z',
    __v: 0
  },
  {
    name: 'Register',
    apiPath: '/auth/register',
    method: 'POST',
    module: 'AUTH',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.864Z',
    updatedAt: '2024-01-31T08:32:13.864Z',
    __v: 0
  },
  {
    name: 'Create a new Job',
    apiPath: '/jobs',
    method: 'POST',
    module: 'JOB',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.923Z',
    updatedAt: '2024-01-31T08:32:13.923Z',
    __v: 0
  },
  // Subcribers
  {
    name: 'Create a new Subcriber',
    apiPath: '/subscribers',
    method: 'POST',
    module: 'SUBCRIBER',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.923Z',
    updatedAt: '2024-01-31T08:32:13.923Z'
  },
  {
    name: 'Get all Subcribers with Pagination',
    apiPath: '/subscribers',
    method: 'GET',
    module: 'SUBCRIBER',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.923Z',
    updatedAt: '2024-01-31T08:32:13.923Z'
  },
  {
    name: 'Get Subcriber with ID',
    apiPath: '/subscribers/:id',
    method: 'GET',
    module: 'SUBCRIBER',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.923Z',
    updatedAt: '2024-01-31T08:32:13.923Z'
  },
  {
    name: 'Update Subcriber with ID',
    apiPath: '/subscribers/:id',
    method: 'PATCH',
    module: 'SUBCRIBER',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.923Z',
    updatedAt: '2024-01-31T08:32:13.923Z'
  },
  {
    name: 'Delete Subcriber with ID',
    apiPath: '/subscribers/:id',
    method: 'DELETE',
    module: 'SUBCRIBER',
    deletedAt: null,
    isDeleted: false,
    createdAt: '2024-01-31T08:32:13.923Z',
    updatedAt: '2024-01-31T08:32:13.923Z'
  }
]

export const ADMIN_ROLE = 'SUPER ADMIN'
export const USER_ROLE = 'NORMAL USER'

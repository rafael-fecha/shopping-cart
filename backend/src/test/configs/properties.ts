export const properties = {
  endpoints: {
    baseUrl: 'https://localhost:8081',
    registration: '/register',
    authentication: '/auth',
    getAllTransactions: '/transactions',
    getTransactionData: '/transaction/54z850d9fef49ae4f108e6777987e6c9',
    getTransactionDataWithInvalidPathParam: '/transaction/simulaterror'
  },
  timeoutValue: 5000,
  authToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc1MzgwNDQ1MjRjNTAzYzE4NzdjOWYiLCJlbWFpbCI6InJhZmFlbC5mZWNoYSIsImlhdCI6MTUzNTM2MzYxNX0.Fy03QVTZ5TanXhfLETLtICVK0NAIjbQrnprLC0atcms',
  credentials: {
    username: 'rafael.fecha',
    password: 'fecha',
    wrongUsername: 'rafael.fecha.simulate.error'
  }
};

const app = require('./app');

const auth = require('./module/auth/auth.index');
const users = require('./module/users/users.index');

app([auth, users]);

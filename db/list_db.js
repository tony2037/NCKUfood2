const STORE = require('../modules/Stores/Stores.model');
const STUDENT = require('../modules/Students/Students.model');
const USER = require('../modules/Users/Users.model');
const db = require('./connect');
db.start();

console.log('stores DB : ===================================');
STORE.list_Stores();
console.log('stores DB : ===================================');
console.log(' ');
console.log('students DB : ===================================');
STUDENT.list_Students();
console.log('students DB : ===================================');
console.log('');
console.log('users DB : ===================================');
USER.list_Users();
console.log('users DB : ===================================');

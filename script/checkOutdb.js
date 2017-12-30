const fs = require('fs');
const db = require('../db/connect');

db.start();

const US = require('../modules/Users/Users.model');

console.log('====start check out collections : Users ....');

US.list_Users();

const fs = require('fs');
const db = require('../db/connect');

db.start();

const US = require('../modules/Users/Users.model');

console.log('====start Kill collections : Users ....');

US.killUsers();
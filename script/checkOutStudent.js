const fs = require('fs');
const db = require('../db/connect');

db.start();

const US = require('../modules/Students/Students.model');

console.log('====start check out collections : Students ....');

US.list_Students();
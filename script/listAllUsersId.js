const fs = require('fs');
const db = require('../db/connect');

db.start();

const US = require('../modules/Users/Users.model');

US.listAllUsersId();
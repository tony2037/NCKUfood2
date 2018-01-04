const fs = require('fs');
const db = require('../db/connect');

db.start();

const STU = require('../modules/Students/Students.model');

STU.whoGiveTheFood('dsf');
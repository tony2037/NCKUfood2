//main.js
const db = require('./db/connect');
const utils = require('./utils/untils');
const path = require('path');



const files = utils.getAllFiles('modules');
const loadModels = () => {
    files.forEach((v, k) => {
        if (/model.js$/.test(v)) {
            require(path.resolve(v));
        }
    });
};
loadModels();

db.start();

// set api routes
files.forEach((v, k) => {
  if (/route.js$/.test(v)) {
      require('./' + v)(app);
  }
});
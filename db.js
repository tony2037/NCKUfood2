var mongoose = require('mongoose');
mongoose.connect('mongodb://wp2017_groupk:uorgn68c@localhost/wp2017_groupk');

var MyModel = mongoose.model('Test', new mongoose.Schema({ name: String }));

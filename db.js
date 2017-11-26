var mongoose = require('mongoose');
mongoose.connect('mongodb://wp2017_groupk:uorgn68c@localhost/wp2017_groupk');
var db_connection = mongoose.connection;
    // if not connected
db_connection.on('error', console.error.bind(console, 'connection error:'));
db_connection.once('open', function() {
    // if connected
    var MyModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
});

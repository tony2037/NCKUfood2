// modules/Users/Users/route.js
const UsersControllder = require('./Users.controller');

module.exports = (app) => {
    app.route('/api/Users/add').post(UsersControllder.add);

    app.route('api/Users/find').get(UsersControllder.get);

    app.route('api/Users/remove').delete(UsersControllder.remove);

    app.route('api/Users/update').put(UsersControllder.update);
}

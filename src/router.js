const Mn = require('backbone.marionette');

const controller = require('./routeController');

module.exports = Mn.AppRouter.extend({
    controller: controller,
    appRoutes: {
        '': 'main'
    },
    onRoute: function(name, path, args) {
    }
});
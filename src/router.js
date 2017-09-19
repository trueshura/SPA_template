var Mn = require('backbone.marionette');
var Bb = require('backbone');

var controller=require('./routeController');

module.exports = Mn.AppRouter.extend({
    controller: controller,
    appRoutes: {
        ''  :                   'main',
    },
    onRoute: function(name, path, args) {
    }  
});
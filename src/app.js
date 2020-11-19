const Bb = require('backbone');
const Mn = require('backbone.marionette');
const $ = require('jquery');

require('../less/style.less');

const appView = require('./views/appView');
const MyRouter = require('./router.js');

const myApp = Mn.Application.extend({
    onStart: function() {
        this.appView = new appView();
        Bb.history.start({root: '/', pushState: true});
    }
});

$(function() {
    const app = window.app = new myApp();
    app.router = new MyRouter();
    app.start();
});


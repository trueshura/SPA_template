var Bb = require('backbone');
var Mn = require('backbone.marionette');
var $ = require('jquery');

require('../less/style.less');

var appView=require('./views/mainView');

var myApp = Mn.Application.extend({
    onStart:    function(){
        this.showView(new appView());
    }
});

$(function(){
    app=new myApp(user);
    app.start();
});


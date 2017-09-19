var Bb = require('backbone');
var Mn = require('backbone.marionette');
var $ = require('jquery');

require('../less/style.less');

var appView=require('./views/appView');
var MyRouter=require('./router.js');

var myApp = Mn.Application.extend({
    onStart:    function(){
        this.appView=new appView();
        Bb.history.start({root: '/',pushState: true});
    }
});

$(function(){
    var app=window.app=new myApp();
    app.router=new MyRouter();
    app.start();
});


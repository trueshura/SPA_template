//var app=require('./app');
var mainView= require('./views/mainView');

module.exports={
    main:   function(){
        app.appView.setMainView(new mainView(),false);
    },
};
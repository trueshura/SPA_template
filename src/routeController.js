//const app=require('./app');
const mainView = require('./views/mainView');

module.exports = {
    main: function() {
        app.appView.setMainView(new mainView(), false);
    }
};
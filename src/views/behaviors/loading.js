const Mn = require('backbone.marionette');

const loadingTemplate=require('./templates/loading.hbs');

module.exports=Mn.Behavior.extend({
    loadingTemplate:   loadingTemplate,
    ui: {
    },
    events: {
    },
    initialize: function(){
        this.view.getTemplate=_.bind(this.getTemplate,this);
    },
    getTemplate: function () {
        if(this.view.model && this.view.model.get('isFetched')){
            return this.view.template;
        }else{
            return this.loadingTemplate;
        }
    }
});
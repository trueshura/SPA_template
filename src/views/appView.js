var Mn = require('backbone.marionette');

//require('../vendor/modal.js');

var handleHrefs=require('./behaviors/handleHrefs');

module.exports=Mn.View.extend({
    behaviors: {
        handleHrefs: handleHrefs,        
    },    
    el:         '#appMain',

    ui:    {
        $main:       '#mainView',
        $controls:   '#appControls',
        $dialogs:    '#dialogs',
        $footer:     '#footer'
    },
    regions:    {
        main:       '@ui.$main',
        controls:   '@ui.$controls',
        dialogs:    '@ui.$dialogs',
        footer:     '@ui.$footer'
    },
    initialize: function(){
//        this.controlView=new appControlsView();
//        this.showChildView('controls', this.controlView);
//        this.showChildView('footer', {template: footer});
        this.$el.removeClass('unloaded');
                
    },
    setMainView: function(view, needWrap){
        needWrap = needWrap === undefined ? true : false;
        var oldView = this.getChildView('main');
        if(oldView && oldView.isAttached()){
            this.detachChildView('main');
            delete oldView;
        }
        this.showChildView('main', view);
        if(needWrap){
            this.ui.$main.parent().addClass('container');
            this.ui.$footer.removeClass('hidden');
        }else{
            this.ui.$main.parent().removeClass('container');
            this.ui.$footer.addClass('hidden');
        }
        $('html, body').animate({
            scrollTop: this.ui.$controls.offset().top},0);
        
        if(this.loginDialog && this.loginDialog.isAttached()) this.loginDialog.destroy();
    },
});

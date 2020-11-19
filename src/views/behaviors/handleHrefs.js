const Mn = require('backbone.marionette');

module.exports=Mn.Behavior.extend({
    events: {
        'click a':  'handleClicks',
    },
    handleClicks: function (e) {
        try{
            const obj=e.currentTarget;
            const url=obj.getAttribute('href');
            if( !e.ctrlKey && !e.shiftKey &&
                obj.getAttribute('target') !== "_blank" &&
                url && url.substring(0,1) !== "#" &&
                !obj.classList.contains('external')){

                e.preventDefault();
                app.router.navigate(url,{trigger:true});
                return false;
            }
        }catch(err){
            alert(err);
        }
    }
});
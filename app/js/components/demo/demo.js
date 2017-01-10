/**
 * demo
 * */

var view = UI.createInstance(UI.View({extends: UIWidgets.View}), {
    wgRegister: UI.createInstance(UI.WidgetRegister())
});

view.onReady(function(e){
    this.createWidgets({
        sentTextViewer: SentTextViewer,
        someTextForm: SomeTextForm
    });
    this.init();
});


/*-----------------Widgets of View -------------------------*/

var SentTextViewer = UI.Widget({
    extends: UIWidgets.Box,

    refs: {},

    init: function(){
        this.super('init');

        this.refs.$box = this.$dom.find('.box');
    },
    setText: function(text){
        this.refs.$box.html(text);
    }
});

var SomeTextForm = UI.Widget({
    extends: UIWidgets.Form,

    init: function(){
        this.super('init');

        var me = this;
        this.submit(function(){
            me.wg('sentTextViewer').setText(me.getElementValue('someText'));
            return false;
        });
    }
});
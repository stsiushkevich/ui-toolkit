var UIWidgets = (function(){
    var MessageBox = UIFactory.createClass('Widget', {
        init: function(){
            this.$dom = $(this.dom);
        },
        setMessage: function(msg){
            this.$dom.html(msg);
        },
        show: function(){
            this.$dom.show();
        },
        hide: function(){
            this.$dom.hide();
        }
    });

    var Overflow = UIFactory.createClass('Widget', {
        getWidget: function(wgId){
            return this.wgRegister.get(wgId);
        },
        onShow: function(handler){
            this.$dom.on('shown.bs.modal', handler);
        },
        onHide: function(handler){
            this.$dom.on('hide.bs.modal', handler);
        },
        setMessage: function(msg){
            this.$body.html(msg);
        },
        show: function(){
            this.$dom.modal('show');
        },
        hide: function(){
            this.$dom.modal('hide');
        }
    });

    var TextInput = UIFactory.createClass('Widget', {
        init: function(){
            this.$dom = $(this.dom);
        },
        getValue: function(){
            return this.$dom.val();
        },
        setValue: function(v){
            this.$dom.val(v);
        }
    });

    var Button  = UIFactory.createClass('Widget', {
        getWidget: function(wgId){
            return this.wgRegister.get(wgId);
        },
        onClick: function(handler){
            this.$dom.on('click', handler);
        }
    });

    var View = UIFactory.createClass('View', {
        onReady: function(handler){
            var me = this;
            $(document).ready(function(e){
                handler.call(me, e);
            });
        },
        createWidget: function(id, widgetClass, config){
            var defaultConfig = {
                dom: document.getElementById(id),
                wgRegister: this.wgRegister
            };
            if(config){
                defaultConfig = $.extend({},defaultConfig,config);
            }
            var widget = UIFactory.createInstance(widgetClass, defaultConfig);
            this.wgRegister.add(id, widget);
        },
        createWidgets: function(config){
            var keys = Object.keys(config);
            for(var i=0; i<keys.length; i++){
                this.createWidget(keys[i], config[keys[i]]);
            }
        },
        init: function(){
            var keys = this.wgRegister.keySet();
            for(var i=0; i<keys.length; i++){
                this.wgRegister.get(keys[i]).init();
            }
        }
    });

    var Form = UIFactory.createClass('Widget', {
        getWidget: function(wgId){
            return this.wgRegister.get(wgId);
        },
        reset: function(){
            this.dom.reset();
        },
        focusOnElement: function(name){
            $(this.dom.elements[name]).focus();
        },
        isValid: function(){
            return this.$dom.valid();
        },
        getElementValue: function(name){
            return $(this.dom.elements[name]).val();
        },
        isElementChecked: function(name){
            return $(this.dom.elements[name]).is(':checked');
        }
    });


    var ComboBox = UIFactory.createClass('Widget', {
        getWidget: function(wgId){
            return this.wgRegister.get(wgId);
        },

        onItemSelected: function(handler){
            var me = this;
            this.$dom.on('change', function(e){
                if(handler) handler.apply(me, [e]);
            });
        },

        getValue: function(){
            return this.$dom.val();
        }
    });

    return {
        MessageBox: MessageBox,
        Overflow: Overflow,
        TextInput: TextInput,
        Button: Button,
        View: View,
        Form: Form,
        ComboBox: ComboBox
    };
})();
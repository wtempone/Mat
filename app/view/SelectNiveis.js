Ext.define("Mat.view.MenuJogo",{
    extend: "Ext.Panel",
    xtype: "MenuJogo",
    config: {
        showAnimation: "pop",
        hidden: true,
        hideAnimation: {
            type: 'popOut',
            easing: 'ease-out'
        },
        layout: "vbox",
        items: [
            {xtype: "spacer"},
            {
                xtype: "label",
                itemId: "nomejogo",
                aling: "center",
                flex: 2,
                style: 'font-size: 30px;',
                center: true
            },
            {
                xtype: "label",
                itemId: "versao",
                style: 'font-size: 10px;',
            },
            {
                xtype: "button",
                text: "Jogar",
                flex:1
            },
            {
                xtype: "button",
                text: "Editar Jogo",
                flex: 1
            },
            {xtype: "spacer"}
        ]
    },
    initialize: function() {
        var store = Ext.getStore("JogoLocal");
        var panel = this;
        store.load({
            callback: function(records, operation, success) {
                if (success == true) {
                    panel.down('#nomejogo').setHtml(store.getAt(0).get("nome"));
                    panel.down('#versao').setHtml("Versão:"+store.getAt(0).get("versao"));
                } else { 
                    alert("Dados do Jogo nao foram carregados. Tente recarregar o jogo");
                }
            }
        });
    }
});
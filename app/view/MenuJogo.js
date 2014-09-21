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
            {
                xtype: "panel",
                itemId: "espaco",
                flex: 5
            },

            {
                xtype: "label",
                itemId: "nomejogo",
                margin: "1em 1em 1em 1em",
                padding: "1em 1em 1em 1em",
                style: 'font-size:' + Math.round(window.innerWidth * 0.10) + 'px;',
                center: true,
                flex: 3
            },
            {
                xtype: "label",
                itemId: "versao",
                style: 'font-size: 10px;text-align:center;color: #ccc;',
            },
            {xtype: "panel",flex: 3},
            {
                xtype: "component",
                html: "Jogar",
                itemId: 'btnJogar',
                flex:1,
                margin: "2em 5em 2em 5em ",
                style: 'font-size:' + Math.round(window.innerWidth * 0.04) + 'px;',                
                listeners: {
                    tap: {
                        fn: function() {
                            var panel = this.up('panel');
                            panel.selecionaNiveis();                            
                        },
                        element: 'element'
                    }
                }                
            },
            {
                xtype: "component",
                html: "Editar Jogo",
                itemId: 'btnEditarJogo',
                flex: 1,
                margin: "0em 5em 2em 5em",
                style: 'font-size:' + Math.round(window.innerWidth * 0.04) + 'px;',                                
                listeners: {
                    tap: {
                        fn: function() {
                            var panel = this.up('panel');
                            panel.editarJogo();
                        },
                        element: 'element'
                    }
                }                
            },
            {
                xtype: "panel",
                itemId: "espaco"
            }
        ]
    },
    selecionaNiveis: function() {
        this.fireEvent("cmdSelecionaFases", this);
    },
    editarJogo: function() {
        this.fireEvent("cmdEditarJogo", this);
    },
    initialize: function() {
        var store = Ext.getStore("JogoLocal");
        var panel = this;
        store.load({
            callback: function(records, operation, success) {
                if (success == true) {
                    panel.down('#nomejogo').setHtml(store.getAt(0).get("nome"));
                    panel.down('#versao').setHtml("Versão:"+store.getAt(0).get("versao"));
                    //panel.down('#nomejogo').setCls('x-carta-'+store.getAt(0).get("versao"));
                    panel.setCls('x-carta-b-'+store.getAt(0).get("versao"));
                    panel.down('#nomejogo').setCls('drop-shadow lifted x-carta-'+store.getAt(0).get("versao"));
                    //panel.down('#versao').setCls('x-carta-b-'+store.getAt(0).get("versao"));
                    panel.down('#espaco').setCls('x-carta-'+store.getAt(0).get("versao"));
                    panel.down('#btnJogar').setCls('x-animation-gelatine-1  x-button x-carta-'+store.getAt(0).get("versao"));
                    panel.down('#btnEditarJogo').setCls('x-animation-gelatine-1 x-button x-carta-'+store.getAt(0).get("versao"));

                } else { 
                    alert("Dados do Jogo nao foram carregados. Tente recarregar o jogo");
                }
            }
        });
    }
});
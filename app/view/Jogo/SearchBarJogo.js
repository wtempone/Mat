Ext.define("Mat.view.Jogo.SearchBarJogo",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarJogo",
    requires: [
               "Ext.field.Search","Ext.field.Select"
               , "Mat.store.Classes"
    ],
    initialize: function() {
        var searchbar = {
            xtype: "toolbar",
            ui: "searchbar",
            items: [
                {
                    xtype: "searchfield",
                    itemId: "versao", 
                    placeHolder: "Versao dos parametros do jogo", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "nome", 
                    placeHolder: "Nome", 
                    flex: 1
                },
                {
                    name: "cd_cls", 
                    itemId: "cd_cls", 
                    xtype: "selectfield",
                    baseCls: "x-field-search",
                    autoSelect: false,
                    placeHolder: "Classe", 
                    store: Ext.create("Mat.store.Classes",{pageSize: null}),
                    displayField: "tx_cls",
                    valueField: "cd_cls",
                    flex: 1,
                    clearIcon: true,
                    listeners: {clearicontap: function() {this.setValue(null);}}
                },
                {
                    xtype: "button",
                    iconCls: "search",
                    handler: this.onSearchJogo,
                    scope:this
                }
            ]
        };
        this.add([searchbar]);
        this.callParent(arguments);
    },
    config: {
        docked: "top",
        ui: "searchbar",
        layout: "vbox"
    },
    onSearchJogo: function() {
        this.fireEvent("searchJogoCommand", this);
    }
});

Ext.define("Mat.view.Niveis.SearchBarNiveis",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarNiveis",
    requires: [
               "Ext.field.Search","Ext.field.Select"
               , "Mat.store.Fases"
               , "Mat.store.Classes"
    ],
    initialize: function() {
        var searchbar = {
            xtype: "toolbar",
            ui: "searchbar",
            items: [
                /*{
                    xtype: "searchfield",
                    itemId: "cd_nivel", 
                    placeHolder: "Nivel", 
                    flex: 1
                },
                {
                    name: "cd_fase", 
                    itemId: "cd_fase", 
                    xtype: "selectfield",
                    baseCls: "x-field-search",
                    autoSelect: false,
                    placeHolder: "Fase", 
                    store: Ext.create("Mat.store.Fases",{pageSize: null}),
                    displayField: "nr_fase",
                    valueField: "cd_fase",
                    flex: 1,
                    clearIcon: true,
                    listeners: {clearicontap: function() {this.setValue(null);}}
                },*/
                {
                    xtype: "searchfield",
                    itemId: "nr_nivel", 
                    placeHolder: "Numero", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "nm_nivel", 
                    placeHolder: "Descrição", 
                    flex: 3
                },/*
                {
                    xtype: "searchfield",
                    itemId: "nr_blocos", 
                    placeHolder: "Blocos por Linha", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "nr_gravid", 
                    placeHolder: "Gravidade", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "nr_tempo", 
                    placeHolder: "Tempo Limite", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "nr_pontos", 
                    placeHolder: "Pontos Alvo", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "in_random", 
                    placeHolder: "Geração Randomica", 
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
                },*/
                {
                    xtype: "button",
                    iconCls: "search",
                    handler: this.onSearchNiveis,
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
    onSearchNiveis: function() {
        this.fireEvent("searchNiveisCommand", this);
    }
});

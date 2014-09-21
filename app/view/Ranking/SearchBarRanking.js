Ext.define("Mat.view.Ranking.SearchBarRanking",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarRanking",
    requires: [
               "Ext.field.Search","Ext.field.Select"
               , "Mat.store.Usuarios"
               , "Mat.store.Fases"
               , "Mat.store.Niveis"
    ],
    initialize: function() {
        var searchbar = {
            xtype: "toolbar",
            ui: "searchbar",
            items: [
                {
                    xtype: "searchfield",
                    itemId: "cd_rank", 
                    placeHolder: "Primarykey", 
                    flex: 1
                },
                {
                    name: "cd_usuar", 
                    itemId: "cd_usuar", 
                    xtype: "selectfield",
                    baseCls: "x-field-search",
                    autoSelect: false,
                    placeHolder: "Código Usuário", 
                    store: Ext.create("Mat.store.Usuarios",{pageSize: null}),
                    displayField: "nm_usuar",
                    valueField: "cd_usuar",
                    flex: 1,
                    clearIcon: true,
                    listeners: {clearicontap: function() {this.setValue(null);}}
                },
                {
                    name: "cd_fase", 
                    itemId: "cd_fase", 
                    xtype: "selectfield",
                    baseCls: "x-field-search",
                    autoSelect: false,
                    placeHolder: "Código da Fase", 
                    store: Ext.create("Mat.store.Fases",{pageSize: null}),
                    displayField: "nr_fase",
                    valueField: "cd_fase",
                    flex: 1,
                    clearIcon: true,
                    listeners: {clearicontap: function() {this.setValue(null);}}
                },
                {
                    name: "cd_nivel", 
                    itemId: "cd_nivel", 
                    xtype: "selectfield",
                    baseCls: "x-field-search",
                    autoSelect: false,
                    placeHolder: "Código do Nivel", 
                    store: Ext.create("Mat.store.Niveis",{pageSize: null}),
                    displayField: "nm_nivel",
                    valueField: "cd_nivel",
                    flex: 1,
                    clearIcon: true,
                    listeners: {clearicontap: function() {this.setValue(null);}}
                },
                {
                    xtype: "searchfield",
                    itemId: "nr_pontos", 
                    placeHolder: "Pontos", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "nr_tempo", 
                    placeHolder: "Tempo", 
                    flex: 1
                },
                {
                    xtype: "button",
                    iconCls: "search",
                    handler: this.onSearchRanking,
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
    onSearchRanking: function() {
        this.fireEvent("searchRankingCommand", this);
    }
});

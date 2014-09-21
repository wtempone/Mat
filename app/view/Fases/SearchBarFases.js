Ext.define("Mat.view.Fases.SearchBarFases",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarFases",
    requires: [
               "Ext.field.Search","Ext.field.Select"
               , "Mat.store.Classes"
    ],
    initialize: function() {
        var searchbar = {
            xtype: "toolbar",
            ui: "searchbar",
            items: [
                /*{
                    xtype: "searchfield",
                    itemId: "cd_fase", 
                    placeHolder: "Fase", 
                    flex: 1
                },*/
                {
                    xtype: "searchfield",
                    itemId: "nr_fase", 
                    placeHolder: "Número da Fase", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "nm_fase", 
                    placeHolder: "Nome da fase", 
                    flex: 3
                },/*
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
                    handler: this.onSearchFases,
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
    onSearchFases: function() {
        this.fireEvent("searchFasesCommand", this);
    }
});

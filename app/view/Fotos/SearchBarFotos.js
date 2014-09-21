Ext.define(".view.Fotos.SearchBarFotos",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarFotos",
    requires: [
               "Ext.field.Search","Ext.field.Select"
    ],
    initialize: function() {
        var searchbar = {
            xtype: "toolbar",
            ui: "searchbar",
            items: [
                {
                    xtype: "searchfield",
                    itemId: "cd_foto", 
                    placeHolder: "Id Foto", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "ar_foto", 
                    placeHolder: "Arquivo", 
                    flex: 1
                },
                {
                    xtype: "button",
                    iconCls: "search",
                    handler: this.onSearchFotos,
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
    onSearchFotos: function() {
        this.fireEvent("searchFotosCommand", this);
    }
});

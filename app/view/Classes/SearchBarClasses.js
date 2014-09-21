Ext.define("Mat.view.Classes.SearchBarClasses",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarClasses",
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
                    itemId: "cd_cls", 
                    placeHolder: "Id Classe", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "tx_cls", 
                    placeHolder: "Definição", 
                    flex: 1
                },
                {
                    xtype: "button",
                    iconCls: "search",
                    handler: this.onSearchClasses,
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
    onSearchClasses: function() {
        this.fireEvent("searchClassesCommand", this);
    }
});

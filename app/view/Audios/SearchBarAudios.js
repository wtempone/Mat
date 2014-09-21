Ext.define(".view.Audios.SearchBarAudios",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarAudios",
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
                    itemId: "cd_audio", 
                    placeHolder: "Id Audio", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "ar_audio", 
                    placeHolder: "Arquivo", 
                    flex: 1
                },
                {
                    xtype: "button",
                    iconCls: "search",
                    handler: this.onSearchAudios,
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
    onSearchAudios: function() {
        this.fireEvent("searchAudiosCommand", this);
    }
});

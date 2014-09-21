Ext.define(".view.Videos.SearchBarVideos",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarVideos",
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
                    itemId: "cd_video", 
                    placeHolder: "Id Video", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "ar_video", 
                    placeHolder: "Arquivo", 
                    flex: 1
                },
                {
                    xtype: "button",
                    iconCls: "search",
                    handler: this.onSearchVideos,
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
    onSearchVideos: function() {
        this.fireEvent("searchVideosCommand", this);
    }
});

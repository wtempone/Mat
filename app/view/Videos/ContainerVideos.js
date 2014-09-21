Ext.define(".view.Videos.ContainerVideos",{
    extend: "Ext.Panel",
    xtype: "ContainerVideos",
    id: "ContainerVideos",
    requires: [".view.Videos.ListVideos",".view.Videos.SearchBarVideos"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Lista Videos",
            items: [
                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddVideosTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarVideos" }, { xtype: "ListVideos"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onAddVideosTap: function() {
        this.fireEvent("addCommandVideos",this);
    }
});

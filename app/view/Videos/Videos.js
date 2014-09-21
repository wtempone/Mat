Ext.define(".view.Videos.Videos",{
    extend: "Ext.Panel",
xtype:     "Videos",
    config: {
        fullscreen: true,
        layout: "card",
        items: [ {xtype: "ContainerVideos" }, {xtype: "EditorVideos"} ]
    }
});

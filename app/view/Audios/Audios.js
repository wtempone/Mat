Ext.define(".view.Audios.Audios",{
    extend: "Ext.Panel",
xtype:     "Audios",
    config: {
        fullscreen: true,
        layout: "card",
        items: [ {xtype: "ContainerAudios" }, {xtype: "EditorAudios"} ]
    }
});

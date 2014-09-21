Ext.define(".view.Fotos.Fotos",{
    extend: "Ext.Panel",
xtype:     "Fotos",
    config: {
        fullscreen: true,
        layout: "card",
        items: [ {xtype: "ContainerFotos" }, {xtype: "EditorFotos"} ]
    }
});

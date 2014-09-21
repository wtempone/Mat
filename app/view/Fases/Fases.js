Ext.define("Mat.view.Fases.Fases",{
    extend: "Ext.Panel",
xtype:     "Fases",
    config: {
        fullscreen: true,
        layout: "card",
        items: [ {xtype: "ContainerFases" }, {xtype: "EditorFases"} ]
    }
});

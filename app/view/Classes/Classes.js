Ext.define("Mat.view.Classes.Classes",{
    extend: "Ext.Panel",
xtype:     "Classes",
    config: {
        fullscreen: true,
        layout: "card",
        items: [ {xtype: "ContainerClasses" }, {xtype: "EditorClasses"} ]
    }
});

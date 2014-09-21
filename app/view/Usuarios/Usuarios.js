Ext.define("Mat.view.Usuarios.Usuarios",{
    extend: "Ext.Panel",
xtype:     "Usuarios",
    config: {
        fullscreen: true,
        layout: "card",
        items: [ {xtype: "ContainerUsuarios" }, {xtype: "EditorUsuarios"} ]
    }
});

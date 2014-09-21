Ext.define("Mat.view.Usuarios.ContainerUsuarios",{
    extend: "Ext.Panel",
    xtype: "ContainerUsuarios",
    id: "ContainerUsuarios",
    requires: ["Mat.view.Usuarios.ListUsuarios","Mat.view.Usuarios.SearchBarUsuarios"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Lista Usuarios",
            items: [
                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddUsuariosTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarUsuarios" }, { xtype: "ListUsuarios"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onAddUsuariosTap: function() {
        this.fireEvent("addCommandUsuarios",this);
    }
});

Ext.define(".view.Fotos.ContainerFotos",{
    extend: "Ext.Panel",
    xtype: "ContainerFotos",
    id: "ContainerFotos",
    requires: [".view.Fotos.ListFotos",".view.Fotos.SearchBarFotos"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Lista Fotos",
            items: [
                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddFotosTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarFotos" }, { xtype: "ListFotos"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onAddFotosTap: function() {
        this.fireEvent("addCommandFotos",this);
    }
});

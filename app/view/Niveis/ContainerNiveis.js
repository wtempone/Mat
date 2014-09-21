Ext.define("Mat.view.Niveis.ContainerNiveis",{
    extend: "Ext.Panel",
    xtype: "ContainerNiveis",
    id: "ContainerNiveis",
    requires: ["Mat.view.Niveis.ListNiveis","Mat.view.Niveis.SearchBarNiveis"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Niveis",
            items: [
                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddNiveisTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarNiveis" }, { xtype: "ListNiveis"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onAddNiveisTap: function() {
        this.fireEvent("addCommandNiveis",this);
    }
});

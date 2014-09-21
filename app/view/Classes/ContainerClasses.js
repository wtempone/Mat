Ext.define("Mat.view.Classes.ContainerClasses",{
    extend: "Ext.Panel",
    xtype: "ContainerClasses",
    id: "ContainerClasses",
    requires: ["Mat.view.Classes.ListClasses","Mat.view.Classes.SearchBarClasses"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Lista Classes",
            items: [
                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddClassesTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarClasses" }, { xtype: "ListClasses"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onAddClassesTap: function() {
        this.fireEvent("addCommandClasses",this);
    }
});

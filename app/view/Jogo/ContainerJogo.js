Ext.define("Mat.view.Jogo.ContainerJogo",{
    extend: "Ext.Panel",
    xtype: "ContainerJogo",
    id: "ContainerJogo",
    requires: ["Mat.view.Jogo.ListJogo","Mat.view.Jogo.SearchBarJogo"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Lista Jogo",
            items: [
                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddJogoTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarJogo" }, { xtype: "ListJogo"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onAddJogoTap: function() {
        this.fireEvent("addCommandJogo",this);
    }
});

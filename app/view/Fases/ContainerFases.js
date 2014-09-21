Ext.define("Mat.view.Fases.ContainerFases",{
    extend: "Ext.Panel",
    xtype: "ContainerFases",
    id: "ContainerFases",
    requires: ["Mat.view.Fases.ListFases","Mat.view.Fases.SearchBarFases"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Fases",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    iconCls: "settings",
                    handler: this.onBackConfig,
                    scope:this
                },

                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddFasesTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarFases" }, { xtype: "ListFases"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onBackConfig:function() {
        this.fireEvent("backConfigCommand",this);
    },
    onAddFasesTap: function() {
        this.fireEvent("addCommandFases",this);
    }
});

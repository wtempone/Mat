Ext.define("Mat.view.Ranking.ContainerRanking",{
    extend: "Ext.Panel",
    xtype: "ContainerRanking",
    id: "ContainerRanking",
    requires: ["Mat.view.Ranking.ListRanking","Mat.view.Ranking.SearchBarRanking"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Lista Ranking",
            items: [
                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddRankingTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarRanking" }, { xtype: "ListRanking"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onAddRankingTap: function() {
        this.fireEvent("addCommandRanking",this);
    }
});

Ext.define("Mat.view.Ranking.Ranking",{
    extend: "Ext.Panel",
xtype:     "Ranking",
    config: {
        fullscreen: true,
        layout: "card",
        items: [ {xtype: "ContainerRanking" }, {xtype: "EditorRanking"} ]
    }
});

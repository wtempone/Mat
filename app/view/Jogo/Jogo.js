Ext.define("Mat.view.Jogo.Jogo",{
    extend: "Ext.Panel",
xtype:     "Jogo",
    config: {
        fullscreen: true,
        layout: "card",
        items: [ {xtype: "EditorJogo" }, {xtype: "Fases"} ]
    }
});

Ext.define("Mat.view.MainJogo",{
    extend: "Ext.Panel",
    xtype: "MainJogo",
    requires: ["Mat.view.Fases.ListFases","Mat.view.Fases.SearchBarFases"],
    config: {
        showAnimation: "pop",
        hidden: true,
        hideAnimation: {
            type: 'popOut',
            easing: 'ease-out'
        },
        layout: "card",
        items: [
            {
                xtype: "MenuJogo"
            },
            {
                xtype: "SelecionaFases"
            },
            {
                xtype: "Jogo"
            }
        ]
    },
});
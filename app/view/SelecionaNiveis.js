Ext.define("Mat.view.SelecionaNiveis",{
    extend: "Ext.Container",
    xtype: "SelecionaNiveis",
    requires: ['Mat.model.NiveisLocal'],
    config: {
                        width: window.innerWidth * 1,
                height: window.innerHeight * 0.5,

        items: [
           {
                xtype: 'dataview',
                scrollable: true,
                inline: true,
                //cls: 'dataview-inline',
                itemTpl: '<div class="x-carta-{nr_nivel}")>{nr_nivel}</div>',
                store: "NiveisLocal"
            }
        ]
    }
});
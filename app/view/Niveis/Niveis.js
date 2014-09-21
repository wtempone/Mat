Ext.define("Mat.view.Niveis.Niveis",{
    extend: "Ext.Panel",
	xtype: "Niveis",
	initialize: function () {
		     //   this.callParent(arguments);
	},
    config: {
        //fullscreen: true,
        layout: "card",
        title: 'Níveis',
        items: [ {xtype: "ContainerNiveis" }, {xtype: "EditorNiveis"} ]
    }

});

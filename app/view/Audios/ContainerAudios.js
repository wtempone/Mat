Ext.define(".view.Audios.ContainerAudios",{
    extend: "Ext.Panel",
    xtype: "ContainerAudios",
    id: "ContainerAudios",
    requires: [".view.Audios.ListAudios",".view.Audios.SearchBarAudios"],
    initialize: function() {
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Lista Audios",
            items: [
                { xtype: "spacer" },
                {
                    xtype: "button",
                    iconCls: "add",
                    handler: this.onAddAudiosTap,
                    scope:this
                }
            ]
        };
        this.add([toolbar, { xtype: "SearchBarAudios" }, { xtype: "ListAudios"}]);
        this.callParent(arguments);
    },
    config: {
        layout: "fit", 
        title: "Note List",
        iconCls: "home"
    },
    onAddAudiosTap: function() {
        this.fireEvent("addCommandAudios",this);
    }
});

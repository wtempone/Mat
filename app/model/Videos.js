Ext.define('.model.Videos', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_video", type: "float"},
            {name: "ar_video", type: "string"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.101/sencha/Mat/resources/ajax/Videos.php?action=create",
                update: "http://192.168.1.101/sencha/Mat/resources/ajax/Videos.php?action=update",
                destroy: "http://192.168.1.101/sencha/Mat/resources/ajax/Videos.php?action=delete"
            }
        }
    }
});

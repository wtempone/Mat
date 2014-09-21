Ext.define('.model.Audios', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_audio", type: "float"},
            {name: "ar_audio", type: "string"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.101/sencha/Mat/resources/ajax/Audios.php?action=create",
                update: "http://192.168.1.101/sencha/Mat/resources/ajax/Audios.php?action=update",
                destroy: "http://192.168.1.101/sencha/Mat/resources/ajax/Audios.php?action=delete"
            }
        }
    }
});

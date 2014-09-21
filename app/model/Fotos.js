Ext.define('.model.Fotos', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_foto", type: "float"},
            {name: "ar_foto", type: "string"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.101/sencha/Mat/resources/ajax/Fotos.php?action=create",
                update: "http://192.168.1.101/sencha/Mat/resources/ajax/Fotos.php?action=update",
                destroy: "http://192.168.1.101/sencha/Mat/resources/ajax/Fotos.php?action=delete"
            }
        }
    }
});

Ext.define('Mat.model.Classes', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_cls", type: "float"},
            {name: "tx_cls", type: "string"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.106/sencha/Mat/resources/ajax/Classes.php?action=create",
                update: "http://192.168.1.106/sencha/Mat/resources/ajax/Classes.php?action=update",
                destroy: "http://192.168.1.106/sencha/Mat/resources/ajax/Classes.php?action=delete"
            }
        }
    }
});

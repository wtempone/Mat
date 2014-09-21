Ext.define('Mat.model.Fases', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_fase", type: "float"},
            {name: "nr_fase", type: "float"},
            {name: "nm_fase", type: "string"},
            {name: "cd_cls", type: "float"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.106/sencha/Mat/resources/ajax/Fases.php?action=create",
                update: "http://192.168.1.106/sencha/Mat/resources/ajax/Fases.php?action=update",
                destroy: "http://192.168.1.106/sencha/Mat/resources/ajax/Fases.php?action=delete"
            }
        }
    }
});

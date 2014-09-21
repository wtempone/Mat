Ext.define('Mat.model.Usuarios', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_usuar", type: "float"},
            {name: "nm_usuar", type: "string"},
            {name: "ar_foto", type: "string"},
            {name: "cd_usuar_faceb", type: "string"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.106/sencha/Mat/resources/ajax/Usuarios.php?action=create",
                update: "http://192.168.1.106/sencha/Mat/resources/ajax/Usuarios.php?action=update",
                destroy: "http://192.168.1.106/sencha/Mat/resources/ajax/Usuarios.php?action=delete"
            }
        }
    }
});

Ext.define('Mat.model.Jogo', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "versao", type: "float"},
            {name: "nome", type: "string"},
            {name: "cd_cls", type: "float"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.106/sencha/Mat/resources/ajax/Jogo.php?action=create",
                update: "http://192.168.1.106/sencha/Mat/resources/ajax/Jogo.php?action=update",
                destroy: "http://192.168.1.106/sencha/Mat/resources/ajax/Jogo.php?action=delete"
            }
        }
    }
});

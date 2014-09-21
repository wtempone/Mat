Ext.define('Mat.model.Niveis', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_nivel", type: "float"},
            {name: "nr_fase", type: "string"},
            {name: "cd_fase", type: "float"},
            {name: "nr_nivel", type: "float"},
            {name: "nm_nivel", type: "string"},
            {name: "nr_blocos", type: "float"},
            {name: "nr_gravid", type: "float"},
            {name: "nr_tempo_ger", type: "float"},
            {name: "nr_tempo", type: "float"},
            {name: "nr_pontos", type: "float"},
            {name: "in_random", type: "int"},
            {name: "tx_excluir", type: "string"},
            {name: "cd_cls", type: "float"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.106/sencha/Mat/resources/ajax/Niveis.php?action=create",
                update: "http://192.168.1.106/sencha/Mat/resources/ajax/Niveis.php?action=update",
                destroy: "http://192.168.1.106/sencha/Mat/resources/ajax/Niveis.php?action=delete"
            }
        }
    }
});

Ext.define('Mat.model.Ranking', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_rank", type: "float"},
            {name: "nm_usuar", type: "string"},
            {name: "cd_usuar", type: "float"},
            {name: "nr_fase", type: "string"},
            {name: "cd_fase", type: "float"},
            {name: "nr_nivel", type: "string"},
            {name: "cd_nivel", type: "float"},
            {name: "nr_pontos", type: "float"},
            {name: "nr_tempo", type: "float"}
        ],
        proxy: {
            type: "ajax",
            api: {
                create: "http://192.168.1.106/sencha/Mat/resources/ajax/Ranking.php?action=create",
                update: "http://192.168.1.106/sencha/Mat/resources/ajax/Ranking.php?action=update",
                destroy: "http://192.168.1.106/sencha/Mat/resources/ajax/Ranking.php?action=delete"
            }
        }
    }
});

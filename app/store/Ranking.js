Ext.define("Mat.store.Ranking", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.Ranking"],
    config: {
        model: "Mat.model.Ranking", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.106/sencha/Mat/resources/ajax/Ranking.php"
            },
            extraParams: {
               cd_rank: "",
               cd_usuar: "",
               cd_fase: "",
               cd_nivel: "",
               nr_pontos: "",
               nr_tempo: ""
            },
            reader: {
                type: "json",
                rootProperty: "ranking", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

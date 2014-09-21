Ext.define("Mat.store.Niveis", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.Niveis"],
    config: {
        model: "Mat.model.Niveis", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.106/sencha/Mat/resources/ajax/Niveis.php"
            },
            extraParams: {
               cd_nivel: "",
               cd_fase: "",
               nr_nivel: "",
               nm_nivel: "",
               nr_blocos: "",
               nr_gravid: "",
               nr_tempo_ger: "",
               nr_tempo: "",
               nr_pontos: "",
               in_random: "",
               tx_excluir: "",
               cd_cls: ""
            },
            reader: {
                type: "json",
                rootProperty: "niveis", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

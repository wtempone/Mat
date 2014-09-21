Ext.define("Mat.store.Fases", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.Fases"],
    config: {
        model: "Mat.model.Fases", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.106/sencha/Mat/resources/ajax/Fases.php"
            },
            extraParams: {
               cd_fase: "",
               nr_fase: "",
               nm_fase: "",
               cd_cls: ""
            },
            reader: {
                type: "json",
                rootProperty: "fases", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

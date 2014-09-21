Ext.define(".store.Fotos", {
    extend: "Ext.data.Store",
    requires: [".model.Fotos"],
    config: {
        model: ".model.Fotos", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.101/sencha/Mat/resources/ajax/Fotos.php"
            },
            extraParams: {
               cd_foto: "",
               ar_foto: ""
            },
            reader: {
                type: "json",
                rootProperty: "fotos", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

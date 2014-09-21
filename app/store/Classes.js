Ext.define("Mat.store.Classes", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.Classes"],
    config: {
        model: "Mat.model.Classes", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.106/sencha/Mat/resources/ajax/Classes.php"
            },
            extraParams: {
               cd_cls: "",
               tx_cls: ""
            },
            reader: {
                type: "json",
                rootProperty: "classes", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

Ext.define("Mat.store.Jogo", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.Jogo"],
    config: {
        model: "Mat.model.Jogo", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.106/sencha/Mat/resources/ajax/Jogo.php"
            },
            extraParams: {
               versao: "",
               nome: "",
               cd_cls: ""
            },
            reader: {
                type: "json",
                rootProperty: "jogo", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

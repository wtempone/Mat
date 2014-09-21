Ext.define("Mat.store.Usuarios", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.Usuarios"],
    config: {
        model: "Mat.model.Usuarios", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.106/sencha/Mat/resources/ajax/Usuarios.php"
            },
            extraParams: {
               cd_usuar: "",
               nm_usuar: "",
               ar_foto: "",
               cd_usuar_faceb: ""
            },
            reader: {
                type: "json",
                rootProperty: "usuarios", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

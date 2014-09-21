Ext.define(".store.Audios", {
    extend: "Ext.data.Store",
    requires: [".model.Audios"],
    config: {
        model: ".model.Audios", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.101/sencha/Mat/resources/ajax/Audios.php"
            },
            extraParams: {
               cd_audio: "",
               ar_audio: ""
            },
            reader: {
                type: "json",
                rootProperty: "audios", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

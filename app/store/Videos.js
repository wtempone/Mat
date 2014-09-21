Ext.define(".store.Videos", {
    extend: "Ext.data.Store",
    requires: [".model.Videos"],
    config: {
        model: ".model.Videos", 
        proxy: {
            type: "ajax",
            api: {
                read: "http://192.168.1.101/sencha/Mat/resources/ajax/Videos.php"
            },
            extraParams: {
               cd_video: "",
               ar_video: ""
            },
            reader: {
                type: "json",
                rootProperty: "videos", 
                totalProperty: "total"
            }
        },
        pageSize: 25,
        autoLoad: true
    }
});

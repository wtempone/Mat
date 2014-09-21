Ext.define("Mat.store.NiveisLocal", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.NiveisLocal",'Ext.data.proxy.LocalStorage'],
    config: {
        model: "Mat.model.NiveisLocal", 
        proxy: {
            type: 'localstorage',
            id: 'Matematrics-Fases'
        },
        autoLoad: true
    }
});

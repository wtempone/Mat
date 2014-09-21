Ext.define("Mat.store.FasesLocal", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.FasesLocal",'Ext.data.proxy.LocalStorage'],
    config: {
        model: "Mat.model.FasesLocal", 
        proxy: {
            type: 'localstorage',
            id: 'Matematrics-Fases'
        },
        autoLoad: true
    }
});

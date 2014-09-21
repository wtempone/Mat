Ext.define("Mat.store.JogoLocal", {
    extend: "Ext.data.Store",
    requires: ["Mat.model.JogoLocal",'Ext.data.proxy.LocalStorage'],
    config: {
        model: "Mat.model.JogoLocal", 
        proxy: {
            type: 'localstorage',
            id: 'Matematrics-Jogo'
        },
        autoLoad: true
    }
});

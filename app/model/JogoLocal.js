Ext.define('Mat.model.JogoLocal', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "versao", type: "float"},
            {name: "nome", type: "string"},
            {name: "cd_cls", type: "float"}
        ],
        proxy: {
            type: 'localstorage',
            id: 'Matematrics-Jogo'
        }
    }
});

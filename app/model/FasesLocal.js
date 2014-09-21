Ext.define('Mat.model.FasesLocal', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: "cd_fase", type: "float"},
            {name: "nr_fase", type: "float"},
            {name: "nm_fase", type: "string"},
            {name: "cd_cls", type: "float"}
        ],
        proxy: {
            type: 'localstorage',
            id: 'Matematrics-Fases'
        }
    }
});

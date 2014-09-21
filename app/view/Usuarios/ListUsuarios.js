Ext.define("Mat.view.Usuarios.ListUsuarios", {
    extend: "Ext.dataview.List",
    xtype: "ListUsuarios",
    id: "ListUsuarios",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Usuarios",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
                '<div class="listTitle">',
                            '{cd_usuar}',
                '</div>',
                '<div class="listBody">',
                        '<div class="listItem"><div class="listLabel">Nome:</div><div class="listField"> {nm_usuar}</div></div>',
                        '<div class="listItem"><div class="listLabel">Foto:</div><div class="listField"> {ar_foto}</div></div>',
                        '<div class="listItem"><div class="listLabel">Id Usuário Facebook:</div><div class="listField"> {cd_usuar_faceb}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandUsuarios", record);
            }
        }
    }
});

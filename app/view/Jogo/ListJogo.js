Ext.define("Mat.view.Jogo.ListJogo", {
    extend: "Ext.dataview.List",
    xtype: "ListJogo",
    id: "ListJogo",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Jogo",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
                '<div class="listTitle">',
                            '{versao}',
                '</div>',
                '<div class="listBody">',
                        '<div class="listItem"><div class="listLabel">Nome:</div><div class="listField"> {nome}</div></div>',
                        '<div class="listItem"><div class="listLabel">Classe:</div><div class="listField"> {tx_cls}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandJogo", record);
            }
        }
    }
});

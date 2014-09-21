Ext.define("Mat.view.Ranking.ListRanking", {
    extend: "Ext.dataview.List",
    xtype: "ListRanking",
    id: "ListRanking",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Ranking",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
                '<div class="listTitle">',
                            '{cd_rank}',
                '</div>',
                '<div class="listBody">',
                        '<div class="listItem"><div class="listLabel">Código Usuário:</div><div class="listField"> {nm_usuar}</div></div>',
                        '<div class="listItem"><div class="listLabel">Código da Fase:</div><div class="listField"> {nr_fase}</div></div>',
                        '<div class="listItem"><div class="listLabel">Código do Nivel:</div><div class="listField"> {nm_nivel}</div></div>',
                        '<div class="listItem"><div class="listLabel">Pontos:</div><div class="listField"> {[this.sformat(values.nr_pontos)]}</div></div>',
                        '<div class="listItem"><div class="listLabel">Tempo:</div><div class="listField"> {[this.sformat(values.nr_tempo)]}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandRanking", record);
            }
        }
    }
});

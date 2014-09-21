Ext.define("Mat.view.Niveis.ListNiveis", {
    extend: "Ext.dataview.List",
    xtype: "ListNiveis",
    id: "ListNiveis",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Niveis",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
                //'<div class="listTitle">',
                //            '{cd_nivel}',
                //'</div>',
                '<div class="listBody">',
                       // '<div class="listItem"><div class="listLabel">Fase:</div><div class="listField"> {nr_fase}</div></div>',
                        //'<div class="listItem"><div class="listLabel">Numero:</div><div class="listField"> {[this.sformat(values.nr_nivel)]}</div></div>',
                        '<div class="listItem">{nr_nivel}: {nm_nivel}</div>',
                        //'<div class="listItem"><div class="listLabel">Blocos por Linha:</div><div class="listField"> {[this.sformat(values.nr_blocos)]}</div></div>',
                        //'<div class="listItem"><div class="listLabel">Gravidade:</div><div class="listField"> {[this.sformat(values.nr_gravid)]}</div></div>',
                        //'<div class="listItem"><div class="listLabel">Tempo Limite:</div><div class="listField"> {[this.sformat(values.nr_tempo)]}</div></div>',
                        //'<div class="listItem"><div class="listLabel">Pontos Alvo:</div><div class="listField"> {[this.sformat(values.nr_pontos)]}</div></div>',
                        //'<div class="listItem"><div class="listLabel">Geração Randomica:</div><div class="listField"> {in_random}</div></div>',
                        //'<div class="listItem"><div class="listLabel">Classe:</div><div class="listField"> {tx_cls}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandNiveis", record);
            }
        }
    }
});

Ext.define("Mat.view.Fases.ListFases", {
    extend: "Ext.dataview.List",
    xtype: "ListFases",
    id: "ListFases",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Fases",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
               // '<div class="listTitle">',
                //            '{nr_fase}',
                //'</div>',
                '<div class="listBody">',
                        //'<div class="listItem"><div class="listLabel">Número da Fase:</div><div class="listField"> {[this.sformat(values.nr_fase)]}</div></div>',
                        '<div class="listItem">{nr_fase}: {nm_fase}</div>',
                        //'<div class="listItem"><div class="listLabel">Classe:</div><div class="listField"> {tx_cls}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandFases", record);
            }
        }
    }
});

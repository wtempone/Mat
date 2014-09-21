Ext.define(".view.Fotos.ListFotos", {
    extend: "Ext.dataview.List",
    xtype: "ListFotos",
    id: "ListFotos",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Fotos",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
                '<div class="listTitle">',
                            '{cd_foto}',
                '</div>',
                '<div class="listBody">',
                        '<div class="listItem"><div class="listLabel">Arquivo:</div><div class="listField"> {ar_foto}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandFotos", record);
            }
        }
    }
});

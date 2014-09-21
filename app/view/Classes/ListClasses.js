Ext.define("Mat.view.Classes.ListClasses", {
    extend: "Ext.dataview.List",
    xtype: "ListClasses",
    id: "ListClasses",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Classes",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
                '<div class="listTitle">',
                            '{cd_cls}',
                '</div>',
                '<div class="listBody">',
                        '<div class="listItem"><div class="listLabel">Definição:</div><div class="listField"> {tx_cls}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandClasses", record);
            }
        }
    }
});

Ext.define(".view.Audios.ListAudios", {
    extend: "Ext.dataview.List",
    xtype: "ListAudios",
    id: "ListAudios",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Audios",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
                '<div class="listTitle">',
                            '{cd_audio}',
                '</div>',
                '<div class="listBody">',
                        '<div class="listItem"><div class="listLabel">Arquivo:</div><div class="listField"> {ar_audio}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandAudios", record);
            }
        }
    }
});

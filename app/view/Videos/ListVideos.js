Ext.define(".view.Videos.ListVideos", {
    extend: "Ext.dataview.List",
    xtype: "ListVideos",
    id: "ListVideos",
    requires: ["Ext.plugin.ListPaging"],
    config: {
        store: "Videos",
        plugins: [
            {
                xclass: "Ext.plugin.ListPaging",
                autoPaging: true
            }
        ],
        itemTpl: [
           '<div class="listBox">',
                '<div class="listTitle">',
                            '{cd_video}',
                '</div>',
                '<div class="listBody">',
                        '<div class="listItem"><div class="listLabel">Arquivo:</div><div class="listField"> {ar_video}</div></div>',
                '</div>',
            '</div>',
             {sformat:  function(value){return value.toFixed(2)}}
        ],
        onItemDisclosure: false,
        listeners:{
            itemtap: function(list, index, target, record) {
                this.fireEvent("editCommandVideos", record);
            }
        }
    }
});

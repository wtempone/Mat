Ext.define(".controller.Videos",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootVideos: "Videos",
            ContainerVideos: "ContainerVideos",
            EditorVideos: "EditorVideos",
            ListVideos: "ListVideos",
            SearchBarVideos: "SearchBarVideos",
            searchFieldVideos: "SearchBarVideos > toolbar"
        },
        control: {
            ContainerVideos: {
                addCommandVideos: "onAddVideos"
            },
            ListVideos: {
                editCommandVideos: "onEditVideos"
            },
            EditorVideos: {
                backCommandVideos: "onBackVideosButton",
                saveCommandVideos: "onSaveVideosButton",
                deleteCommandVideos: "onDeleteVideosButton"
            },
            SearchBarVideos: {
                searchVideosCommand: "onSearchVideos"
            }
        }
    },
    onAddVideos: function() {
        var newVideos = Ext.create(".model.Videos");
        this.getEditorVideos().setRecord(newVideos);
        this.getRootVideos().animateActiveItem(this.getEditorVideos(), { type: "slide", direction: "left" });
    },
    onEditVideos: function(record){
        record.phantom = false;
        this.getEditorVideos().setRecord(record);
        this.getRootVideos().animateActiveItem(this.getEditorVideos(), { type: "slide", direction: "left" });
    },
    onSearchVideos: function(){
        var store = Ext.getStore("Videos");
        store.getProxy().setExtraParam("cd_video",  this.getSearchFieldVideos().down("#cd_video").getValue());
        store.getProxy().setExtraParam("ar_video",  this.getSearchFieldVideos().down("#ar_video").getValue());
        store.loadPage(1);
    },
    onBackVideosButton: function() {
        this.getRootVideos().animateActiveItem(this.getContainerVideos(), { type: "slide", direction: "right" });
    },
    onSaveVideosButton: function() {
        var currentVideos = this.getEditorVideos().getRecord();
        var newValue = this.getEditorVideos().getValues();
        var MainCont = this.getRootVideos();
        var AuxViewVideos = this.getContainerVideos();
        currentVideos.set(newValue);
        var errors = currentVideos.validate();
        if (!errors.isValid()) {
            currentVideos.reject();
            alert("Registros contem erros");
            return;
        }
        currentVideos.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewVideos, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteVideosButton: function() {
        var deleteVideos = this.getEditorVideos().getRecord();
        var AuxViewVideos = this.getContainerVideos();
        var MainCont = this.getRootVideos();
        deleteVideos.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewVideos, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var VideosStore = Ext.getStore("Videos")
        VideosStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});

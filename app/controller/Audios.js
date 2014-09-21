Ext.define(".controller.Audios",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootAudios: "Audios",
            ContainerAudios: "ContainerAudios",
            EditorAudios: "EditorAudios",
            ListAudios: "ListAudios",
            SearchBarAudios: "SearchBarAudios",
            searchFieldAudios: "SearchBarAudios > toolbar"
        },
        control: {
            ContainerAudios: {
                addCommandAudios: "onAddAudios"
            },
            ListAudios: {
                editCommandAudios: "onEditAudios"
            },
            EditorAudios: {
                backCommandAudios: "onBackAudiosButton",
                saveCommandAudios: "onSaveAudiosButton",
                deleteCommandAudios: "onDeleteAudiosButton"
            },
            SearchBarAudios: {
                searchAudiosCommand: "onSearchAudios"
            }
        }
    },
    onAddAudios: function() {
        var newAudios = Ext.create(".model.Audios");
        this.getEditorAudios().setRecord(newAudios);
        this.getRootAudios().animateActiveItem(this.getEditorAudios(), { type: "slide", direction: "left" });
    },
    onEditAudios: function(record){
        record.phantom = false;
        this.getEditorAudios().setRecord(record);
        this.getRootAudios().animateActiveItem(this.getEditorAudios(), { type: "slide", direction: "left" });
    },
    onSearchAudios: function(){
        var store = Ext.getStore("Audios");
        store.getProxy().setExtraParam("cd_audio",  this.getSearchFieldAudios().down("#cd_audio").getValue());
        store.getProxy().setExtraParam("ar_audio",  this.getSearchFieldAudios().down("#ar_audio").getValue());
        store.loadPage(1);
    },
    onBackAudiosButton: function() {
        this.getRootAudios().animateActiveItem(this.getContainerAudios(), { type: "slide", direction: "right" });
    },
    onSaveAudiosButton: function() {
        var currentAudios = this.getEditorAudios().getRecord();
        var newValue = this.getEditorAudios().getValues();
        var MainCont = this.getRootAudios();
        var AuxViewAudios = this.getContainerAudios();
        currentAudios.set(newValue);
        var errors = currentAudios.validate();
        if (!errors.isValid()) {
            currentAudios.reject();
            alert("Registros contem erros");
            return;
        }
        currentAudios.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewAudios, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteAudiosButton: function() {
        var deleteAudios = this.getEditorAudios().getRecord();
        var AuxViewAudios = this.getContainerAudios();
        var MainCont = this.getRootAudios();
        deleteAudios.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewAudios, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var AudiosStore = Ext.getStore("Audios")
        AudiosStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});

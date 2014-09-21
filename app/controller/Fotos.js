Ext.define(".controller.Fotos",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootFotos: "Fotos",
            ContainerFotos: "ContainerFotos",
            EditorFotos: "EditorFotos",
            ListFotos: "ListFotos",
            SearchBarFotos: "SearchBarFotos",
            searchFieldFotos: "SearchBarFotos > toolbar"
        },
        control: {
            ContainerFotos: {
                addCommandFotos: "onAddFotos"
            },
            ListFotos: {
                editCommandFotos: "onEditFotos"
            },
            EditorFotos: {
                backCommandFotos: "onBackFotosButton",
                saveCommandFotos: "onSaveFotosButton",
                deleteCommandFotos: "onDeleteFotosButton"
            },
            SearchBarFotos: {
                searchFotosCommand: "onSearchFotos"
            }
        }
    },
    onAddFotos: function() {
        var newFotos = Ext.create(".model.Fotos");
        this.getEditorFotos().setRecord(newFotos);
        this.getRootFotos().animateActiveItem(this.getEditorFotos(), { type: "slide", direction: "left" });
    },
    onEditFotos: function(record){
        record.phantom = false;
        this.getEditorFotos().setRecord(record);
        this.getRootFotos().animateActiveItem(this.getEditorFotos(), { type: "slide", direction: "left" });
    },
    onSearchFotos: function(){
        var store = Ext.getStore("Fotos");
        store.getProxy().setExtraParam("cd_foto",  this.getSearchFieldFotos().down("#cd_foto").getValue());
        store.getProxy().setExtraParam("ar_foto",  this.getSearchFieldFotos().down("#ar_foto").getValue());
        store.loadPage(1);
    },
    onBackFotosButton: function() {
        this.getRootFotos().animateActiveItem(this.getContainerFotos(), { type: "slide", direction: "right" });
    },
    onSaveFotosButton: function() {
        var currentFotos = this.getEditorFotos().getRecord();
        var newValue = this.getEditorFotos().getValues();
        var MainCont = this.getRootFotos();
        var AuxViewFotos = this.getContainerFotos();
        currentFotos.set(newValue);
        var errors = currentFotos.validate();
        if (!errors.isValid()) {
            currentFotos.reject();
            alert("Registros contem erros");
            return;
        }
        currentFotos.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewFotos, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteFotosButton: function() {
        var deleteFotos = this.getEditorFotos().getRecord();
        var AuxViewFotos = this.getContainerFotos();
        var MainCont = this.getRootFotos();
        deleteFotos.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewFotos, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var FotosStore = Ext.getStore("Fotos")
        FotosStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});

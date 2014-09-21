Ext.define("Mat.controller.Fases",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootFases: "Fases",
            ContainerFases: "ContainerFases",
            Jogo: "Jogo",
            EditorJogo: "EditorJogo",
            Niveis: "Niveis",
            EditorFases: "EditorFases",
            ListFases: "ListFases",

            SearchBarFases: "SearchBarFases",
            searchFieldFases: "SearchBarFases > toolbar"
        },
        control: {
            ContainerFases: {
                addCommandFases: "onAddFases",
                backConfigCommand: "onBackConfig"
            },
            ListFases: {
                editCommandFases: "onEditFases"
            },
            EditorFases: {
                backCommandFases: "onBackFasesButton",
                saveCommandFases: "onSaveFasesButton",
                deleteCommandFases: "onDeleteFasesButton"
            },
            SearchBarFases: {
                searchFasesCommand: "onSearchFases"
            }
        }
    },
    onBackConfig:function() {
        this.getJogo().animateActiveItem(this.getEditorJogo(), { type: "slide", direction: "right" });
    },
    onAddFases: function() {
        var newFases = Ext.create("Mat.model.Fases");
        this.getEditorFases().setRecord(newFases);
        this.getNiveis().setDisabled(true);
        this.getRootFases().animateActiveItem(this.getEditorFases(), { type: "slide", direction: "left" });
    },
    onEditFases: function(record){
        record.phantom = false;
        this.getEditorFases().setRecord(record);
        this.getNiveis().setDisabled(false);
        this.getEditorFases().down('tabpanel').setActiveItem(0);
        this.getApplication().getController('Niveis').onSearchNiveis();
        this.getApplication().getController('Niveis').resset();

        this.getRootFases().animateActiveItem(this.getEditorFases(), { type: "slide", direction: "left" });
    },
    onSearchFases: function(){
        var store = Ext.getStore("Fases");
        //store.getProxy().setExtraParam("cd_fase",  this.getSearchFieldFases().down("#cd_fase").getValue());
        store.getProxy().setExtraParam("nr_fase",  this.getSearchFieldFases().down("#nr_fase").getValue());
        store.getProxy().setExtraParam("nm_fase",  this.getSearchFieldFases().down("#nm_fase").getValue());
        //store.getProxy().setExtraParam("cd_cls",  this.getSearchFieldFases().down("#cd_cls").getValue());
        store.loadPage(1);
    },
    onBackFasesButton: function() {
        this.getRootFases().animateActiveItem(this.getContainerFases(), { type: "slide", direction: "right" });
    },
    onSaveFasesButton: function() {
        var currentFases = this.getEditorFases().getRecord();
        var newValue = this.getEditorFases().getValues();
        var MainCont = this.getRootFases();
        var AuxViewFases = this.getContainerFases();
        currentFases.set(newValue);
        var errors = currentFases.validate();
        if (!errors.isValid()) {
            currentFases.reject();
            alert("Registros contem erros");
            return;
        }
        currentFases.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewFases, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteFasesButton: function() {
        var deleteFases = this.getEditorFases().getRecord();
        var AuxViewFases = this.getContainerFases();
        var MainCont = this.getRootFases();
        var storeNiveis = Ext.getStore("Niveis");
        storeNiveis.getProxy().setExtraParam("cd_fase",  this.getEditorFases().getRecord().get("cd_fase"));
        storeNiveis.load({
            callback: function(records, operation, success) {
                if (success == true) {
                    // verifica se existe algum registro cadastrado
                    if (storeNiveis.getCount() > 0) {
                        storeNiveis.each(function(record,id){
                            record.erase();
                        });
                    }
                }   
            }
        });

        deleteFases.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewFases, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var FasesStore = Ext.getStore("Fases")
        FasesStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});

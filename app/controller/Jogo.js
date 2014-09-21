Ext.define("Mat.controller.Jogo",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootJogo: "Jogo",
            ContainerJogo: "ContainerJogo",
            EditorJogo: "EditorJogo",
            ListJogo: "ListJogo",
            Fases: "Fases",
            SearchBarJogo: "SearchBarJogo",
            searchFieldJogo: "SearchBarJogo > toolbar"
        },
        control: {
            ContainerJogo: {
                addCommandJogo: "onAddJogo"
            },
            ListJogo: {
                editCommandJogo: "onEditJogo"
            },
            EditorJogo: {
                backCommandJogo: "onBackJogoButton",
                saveCommandJogo: "onSaveJogoButton",
                editarFasesCommandJogo: "onEditarFasesButton",
                deleteCommandJogo: "onDeleteJogoButton"
            },
            SearchBarJogo: {
                searchJogoCommand: "onSearchJogo"
            }
        }
    },
    onAddJogo: function() {
        var newJogo = Ext.create("Mat.model.Jogo");
        this.getEditorJogo().setRecord(newJogo);
        this.getRootJogo().animateActiveItem(this.getEditorJogo(), { type: "slide", direction: "left" });
    },
    onEditJogo: function(record){
        record.phantom = false;
        this.getEditorJogo().setRecord(record);
        this.getRootJogo().animateActiveItem(this.getEditorJogo(), { type: "slide", direction: "left" });
    },
    onEditarFasesButton: function( ) { 
        //console.log( this.getRootJogo());
        //console.log( this.getFases());
        //console.log( this.getRootJogo().animateActiveItem(this.getFases(), { type: "slide", direction: "left" }));
        this.getRootJogo().animateActiveItem(this.getFases(), { type: "slide", direction: "left" });
    },
    onSearchJogo: function(){
        var store = Ext.getStore("Jogo");
        store.getProxy().setExtraParam("versao",  this.getSearchFieldJogo().down("#versao").getValue());
        store.getProxy().setExtraParam("nome",  this.getSearchFieldJogo().down("#nome").getValue());
        store.getProxy().setExtraParam("cd_cls",  this.getSearchFieldJogo().down("#cd_cls").getValue());
        store.loadPage(1);
    },
    onBackJogoButton: function() {
        this.getRootJogo().animateActiveItem(this.getContainerJogo(), { type: "slide", direction: "right" });
    },
    onSaveJogoButton: function() {
        var currentJogo = this.getEditorJogo().getRecord();
        var newValue = this.getEditorJogo().getValues();
        var MainCont = this.getRootJogo();
        var AuxViewJogo = this.getContainerJogo();
        currentJogo.set(newValue);
        var errors = currentJogo.validate();
        if (!errors.isValid()) {
            currentJogo.reject();
            alert("Registros contem erros");
            return;
        }
        currentJogo.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewJogo, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteJogoButton: function() {
        var deleteJogo = this.getEditorJogo().getRecord();
        var AuxViewJogo = this.getContainerJogo();
        var MainCont = this.getRootJogo();
        deleteJogo.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewJogo, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var JogoStore = Ext.getStore("Jogo")
        JogoStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});

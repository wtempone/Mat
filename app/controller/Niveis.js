Ext.define("Mat.controller.Niveis",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootNiveis: "Niveis",
            ContainerNiveis: "ContainerNiveis",
            EditorNiveis: "EditorNiveis",
            EditorFases: "EditorFases",
            ListNiveis: "ListNiveis",
            SearchBarNiveis: "SearchBarNiveis",
            searchFieldNiveis: "SearchBarNiveis > toolbar"
        },
        control: {
            ContainerNiveis: {
                addCommandNiveis: "onAddNiveis"
            },
            ListNiveis: {
                editCommandNiveis: "onEditNiveis"
            },
            EditorNiveis: {
                backCommandNiveis: "onBackNiveisButton",
                saveCommandNiveis: "onSaveNiveisButton",
                deleteCommandNiveis: "onDeleteNiveisButton"
            },
            SearchBarNiveis: {
                searchNiveisCommand: "onSearchNiveis"
            }
        }
    },
    onAddNiveis: function() {
        console.log('set cd_fase add nivel -- fase' + this.getEditorFases().getRecord().get("cd_fase"))
        var newNiveis = Ext.create("Mat.model.Niveis");
        newNiveis.set("cd_fase", this.getEditorFases().getRecord().get("cd_fase"));
        this.getEditorNiveis().setRecord(newNiveis);
        this.getRootNiveis().animateActiveItem(this.getEditorNiveis(), { type: "slide", direction: "left" });
    },
    onEditNiveis: function(record){
        record.phantom = false;
        this.getEditorNiveis().setRecord(record);
        this.getRootNiveis().animateActiveItem(this.getEditorNiveis(), { type: "slide", direction: "left" });
    },
    onSearchNiveis: function(){
        var store = Ext.getStore("Niveis");
        //store.getProxy().setExtraParam("cd_nivel",  this.getSearchFieldNiveis().down("#cd_nivel").getValue());
        console.log('set cd_fase search nivel -- fase: ' + this.getEditorFases().getRecord().get("cd_fase"))
        store.getProxy().setExtraParam("cd_fase",  this.getEditorFases().getRecord().get("cd_fase"));
        store.getProxy().setExtraParam("nr_nivel",  this.getSearchFieldNiveis().down("#nr_nivel").getValue());
        store.getProxy().setExtraParam("nm_nivel",  this.getSearchFieldNiveis().down("#nm_nivel").getValue());

        //store.getProxy().setExtraParam("nr_blocos",  this.getSearchFieldNiveis().down("#nr_blocos").getValue());
        //store.getProxy().setExtraParam("nr_gravid",  this.getSearchFieldNiveis().down("#nr_gravid").getValue());
        //store.getProxy().setExtraParam("nr_tempo",  this.getSearchFieldNiveis().down("#nr_tempo").getValue());
        //store.getProxy().setExtraParam("nr_pontos",  this.getSearchFieldNiveis().down("#nr_pontos").getValue());
        //store.getProxy().setExtraParam("in_random",  this.getSearchFieldNiveis().down("#in_random").getValue());
        //store.getProxy().setExtraParam("cd_cls",  this.getSearchFieldNiveis().down("#cd_cls").getValue());
        store.loadPage(1);
    },
    onBackNiveisButton: function() {
        this.getRootNiveis().animateActiveItem(this.getContainerNiveis(), { type: "slide", direction: "right" });
    },
    onSaveNiveisButton: function() {
        var currentNiveis = this.getEditorNiveis().getRecord();
        var newValue = this.getEditorNiveis().getValues();
        var MainCont = this.getRootNiveis();
        var AuxViewNiveis = this.getContainerNiveis();
        currentNiveis.set(newValue);
        var errors = currentNiveis.validate();
        if (!errors.isValid()) {
            currentNiveis.reject();
            alert("Registros contem erros");
            return;
        }
        currentNiveis.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewNiveis, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteNiveisButton: function() {
        var deleteNiveis = this.getEditorNiveis().getRecord();
        var AuxViewNiveis = this.getContainerNiveis();
        var MainCont = this.getRootNiveis();
        deleteNiveis.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewNiveis, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var NiveisStore = Ext.getStore("Niveis")
        NiveisStore.load();
    },
    resset: function() {
        this.getRootNiveis().setActiveItem(this.getContainerNiveis());
    },
    init: function () {
        this.callParent(arguments);
    }
});

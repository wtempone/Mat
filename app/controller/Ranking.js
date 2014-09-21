Ext.define("Mat.controller.Ranking",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootRanking: "Ranking",
            ContainerRanking: "ContainerRanking",
            EditorRanking: "EditorRanking",
            ListRanking: "ListRanking",
            SearchBarRanking: "SearchBarRanking",
            searchFieldRanking: "SearchBarRanking > toolbar"
        },
        control: {
            ContainerRanking: {
                addCommandRanking: "onAddRanking"
            },
            ListRanking: {
                editCommandRanking: "onEditRanking"
            },
            EditorRanking: {
                backCommandRanking: "onBackRankingButton",
                saveCommandRanking: "onSaveRankingButton",
                deleteCommandRanking: "onDeleteRankingButton"
            },
            SearchBarRanking: {
                searchRankingCommand: "onSearchRanking"
            }
        }
    },
    onAddRanking: function() {
        var newRanking = Ext.create("Mat.model.Ranking");
        this.getEditorRanking().setRecord(newRanking);
        this.getRootRanking().animateActiveItem(this.getEditorRanking(), { type: "slide", direction: "left" });
    },
    onEditRanking: function(record){
        record.phantom = false;
        this.getEditorRanking().setRecord(record);
        this.getRootRanking().animateActiveItem(this.getEditorRanking(), { type: "slide", direction: "left" });
    },
    onSearchRanking: function(){
        var store = Ext.getStore("Ranking");
        store.getProxy().setExtraParam("cd_rank",  this.getSearchFieldRanking().down("#cd_rank").getValue());
        store.getProxy().setExtraParam("cd_usuar",  this.getSearchFieldRanking().down("#cd_usuar").getValue());
        store.getProxy().setExtraParam("cd_fase",  this.getSearchFieldRanking().down("#cd_fase").getValue());
        store.getProxy().setExtraParam("cd_nivel",  this.getSearchFieldRanking().down("#cd_nivel").getValue());
        store.getProxy().setExtraParam("nr_pontos",  this.getSearchFieldRanking().down("#nr_pontos").getValue());
        store.getProxy().setExtraParam("nr_tempo",  this.getSearchFieldRanking().down("#nr_tempo").getValue());
        store.loadPage(1);
    },
    onBackRankingButton: function() {
        this.getRootRanking().animateActiveItem(this.getContainerRanking(), { type: "slide", direction: "right" });
    },
    onSaveRankingButton: function() {
        var currentRanking = this.getEditorRanking().getRecord();
        var newValue = this.getEditorRanking().getValues();
        var MainCont = this.getRootRanking();
        var AuxViewRanking = this.getContainerRanking();
        currentRanking.set(newValue);
        var errors = currentRanking.validate();
        if (!errors.isValid()) {
            currentRanking.reject();
            alert("Registros contem erros");
            return;
        }
        currentRanking.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewRanking, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteRankingButton: function() {
        var deleteRanking = this.getEditorRanking().getRecord();
        var AuxViewRanking = this.getContainerRanking();
        var MainCont = this.getRootRanking();
        deleteRanking.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewRanking, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var RankingStore = Ext.getStore("Ranking")
        RankingStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});

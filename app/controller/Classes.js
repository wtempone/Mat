Ext.define("Mat.controller.Classes",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootClasses: "Classes",
            ContainerClasses: "ContainerClasses",
            EditorClasses: "EditorClasses",
            ListClasses: "ListClasses",
            SearchBarClasses: "SearchBarClasses",
            searchFieldClasses: "SearchBarClasses > toolbar"
        },
        control: {
            ContainerClasses: {
                addCommandClasses: "onAddClasses"
            },
            ListClasses: {
                editCommandClasses: "onEditClasses"
            },
            EditorClasses: {
                backCommandClasses: "onBackClassesButton",
                saveCommandClasses: "onSaveClassesButton",
                deleteCommandClasses: "onDeleteClassesButton"
            },
            SearchBarClasses: {
                searchClassesCommand: "onSearchClasses"
            }
        }
    },
    onAddClasses: function() {
        var newClasses = Ext.create("Mat.model.Classes");
        this.getEditorClasses().setRecord(newClasses);
        this.getRootClasses().animateActiveItem(this.getEditorClasses(), { type: "slide", direction: "left" });
    },
    onEditClasses: function(record){
        record.phantom = false;
        this.getEditorClasses().setRecord(record);
        this.getRootClasses().animateActiveItem(this.getEditorClasses(), { type: "slide", direction: "left" });
    },
    onSearchClasses: function(){
        var store = Ext.getStore("Classes");
        store.getProxy().setExtraParam("cd_cls",  this.getSearchFieldClasses().down("#cd_cls").getValue());
        store.getProxy().setExtraParam("tx_cls",  this.getSearchFieldClasses().down("#tx_cls").getValue());
        store.loadPage(1);
    },
    onBackClassesButton: function() {
        this.getRootClasses().animateActiveItem(this.getContainerClasses(), { type: "slide", direction: "right" });
    },
    onSaveClassesButton: function() {
        var currentClasses = this.getEditorClasses().getRecord();
        var newValue = this.getEditorClasses().getValues();
        var MainCont = this.getRootClasses();
        var AuxViewClasses = this.getContainerClasses();
        currentClasses.set(newValue);
        var errors = currentClasses.validate();
        if (!errors.isValid()) {
            currentClasses.reject();
            alert("Registros contem erros");
            return;
        }
        currentClasses.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewClasses, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteClassesButton: function() {
        var deleteClasses = this.getEditorClasses().getRecord();
        var AuxViewClasses = this.getContainerClasses();
        var MainCont = this.getRootClasses();
        deleteClasses.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewClasses, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var ClassesStore = Ext.getStore("Classes")
        ClassesStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});

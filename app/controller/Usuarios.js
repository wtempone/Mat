Ext.define("Mat.controller.Usuarios",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            RootUsuarios: "Usuarios",
            ContainerUsuarios: "ContainerUsuarios",
            EditorUsuarios: "EditorUsuarios",
            ListUsuarios: "ListUsuarios",
            SearchBarUsuarios: "SearchBarUsuarios",
            searchFieldUsuarios: "SearchBarUsuarios > toolbar"
        },
        control: {
            ContainerUsuarios: {
                addCommandUsuarios: "onAddUsuarios"
            },
            ListUsuarios: {
                editCommandUsuarios: "onEditUsuarios"
            },
            EditorUsuarios: {
                backCommandUsuarios: "onBackUsuariosButton",
                saveCommandUsuarios: "onSaveUsuariosButton",
                deleteCommandUsuarios: "onDeleteUsuariosButton"
            },
            SearchBarUsuarios: {
                searchUsuariosCommand: "onSearchUsuarios"
            }
        }
    },
    onAddUsuarios: function() {
        var newUsuarios = Ext.create("Mat.model.Usuarios");
        this.getEditorUsuarios().setRecord(newUsuarios);
        this.getRootUsuarios().animateActiveItem(this.getEditorUsuarios(), { type: "slide", direction: "left" });
    },
    onEditUsuarios: function(record){
        record.phantom = false;
        this.getEditorUsuarios().setRecord(record);
        this.getRootUsuarios().animateActiveItem(this.getEditorUsuarios(), { type: "slide", direction: "left" });
    },
    onSearchUsuarios: function(){
        var store = Ext.getStore("Usuarios");
        store.getProxy().setExtraParam("cd_usuar",  this.getSearchFieldUsuarios().down("#cd_usuar").getValue());
        store.getProxy().setExtraParam("nm_usuar",  this.getSearchFieldUsuarios().down("#nm_usuar").getValue());
        store.getProxy().setExtraParam("ar_foto",  this.getSearchFieldUsuarios().down("#ar_foto").getValue());
        store.getProxy().setExtraParam("cd_usuar_faceb",  this.getSearchFieldUsuarios().down("#cd_usuar_faceb").getValue());
        store.loadPage(1);
    },
    onBackUsuariosButton: function() {
        this.getRootUsuarios().animateActiveItem(this.getContainerUsuarios(), { type: "slide", direction: "right" });
    },
    onSaveUsuariosButton: function() {
        var currentUsuarios = this.getEditorUsuarios().getRecord();
        var newValue = this.getEditorUsuarios().getValues();
        var MainCont = this.getRootUsuarios();
        var AuxViewUsuarios = this.getContainerUsuarios();
        currentUsuarios.set(newValue);
        var errors = currentUsuarios.validate();
        if (!errors.isValid()) {
            currentUsuarios.reject();
            alert("Registros contem erros");
            return;
        }
        currentUsuarios.save(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewUsuarios, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não foi possivel alterar o registro');
                }
            }
        );
    },
    onDeleteUsuariosButton: function() {
        var deleteUsuarios = this.getEditorUsuarios().getRecord();
        var AuxViewUsuarios = this.getContainerUsuarios();
        var MainCont = this.getRootUsuarios();
        deleteUsuarios.erase(
            {
                scope: this,
                success: function() {
                    MainCont.animateActiveItem(AuxViewUsuarios, { type: "slide", direction: "right" });
                 },
                failure: function() {
                    alert('Não coi possivel exluir o registro');
                }
            }
        );
    },
    launch: function () {
        this.callParent(arguments);
        var UsuariosStore = Ext.getStore("Usuarios")
        UsuariosStore.load();
    },
    init: function () {
        this.callParent(arguments);
    }
});

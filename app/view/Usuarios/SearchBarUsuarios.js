Ext.define("Mat.view.Usuarios.SearchBarUsuarios",{
    extend: "Ext.Toolbar",
    xtype: "SearchBarUsuarios",
    requires: [
               "Ext.field.Search","Ext.field.Select"
    ],
    initialize: function() {
        var searchbar = {
            xtype: "toolbar",
            ui: "searchbar",
            items: [
                {
                    xtype: "searchfield",
                    itemId: "cd_usuar", 
                    placeHolder: "Usuário", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "nm_usuar", 
                    placeHolder: "Nome", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "ar_foto", 
                    placeHolder: "Foto", 
                    flex: 1
                },
                {
                    xtype: "searchfield",
                    itemId: "cd_usuar_faceb", 
                    placeHolder: "Id Usuário Facebook", 
                    flex: 1
                },
                {
                    xtype: "button",
                    iconCls: "search",
                    handler: this.onSearchUsuarios,
                    scope:this
                }
            ]
        };
        this.add([searchbar]);
        this.callParent(arguments);
    },
    config: {
        docked: "top",
        ui: "searchbar",
        layout: "vbox"
    },
    onSearchUsuarios: function() {
        this.fireEvent("searchUsuariosCommand", this);
    }
});

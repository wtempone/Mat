Ext.define("Mat.view.Usuarios.EditorUsuarios",{
    extend: "Ext.form.Panel",
    xtype: "EditorUsuarios",
    requires: ["Ext.form.FieldSet", "Ext.field.Select", "Ext.field.Toggle", "Ext.field.Number", "Ext.field.DatePicker","Ext.ActionSheet"],
    initialize: function(){
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Novo Usuarios",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    iconCls: "home",
                    handler: this.onBackUsuariosTap,
                    scope: this
                },
                { xtype: "spacer" },
                {
                    xtype: "button",
                    ui: "confirm",
                    iconCls: "compose",
                    handler: this.onSaveUsuariosTap,
                    scope: this
                }
            ]
        };
        var toolbar2 = {
            xtype: "toolbar",
            docked: "bottom",
            items: [
                {
                    xtype: "button",
                    ui: "decline",
                    iconCls: "trash",
                    centered: true,
                    handler: this.onDeleteUsuariosTap,
                    scope: this
                }
            ]
        };
        this.add([
            toolbar,
            {
                xtype: "fieldset",
                title: "Usuarios",
                defaults: {
                    xtype: "textfield"
                },
                items: [
                    {
                        xtype: "numberfield", 
                        disabled: true, 
                        name: "cd_usuar", 
                        size: 4, 
                        label: "Usuário" 
                    },
                    {
                        name: "nm_usuar", 
                        size: 255, 
                        label: "Nome" 
                    },
                    {
                        name: "ar_foto", 
                        size: 0, 
                        label: "Foto" 
                    },
                    {
                        name: "cd_usuar_faceb", 
                        size: 255, 
                        label: "Id Usuário Facebook" 
                    }
                ]
            },
            toolbar2
        ]);
        this.callParent(arguments);
    },
    config: {
        listeners: {
            show: function() { this.onUsuariosShow(); }
        }
    },
    onUsuariosShow: function(){
        if (this.getRecord().phantom)
            this.items.get(0).setTitle("Novo Usuarios");
        else
            this.items.get(0).setTitle("Editar Usuarios");
            
    },
    onSaveUsuariosTap: function() {
        var items = [
            {
                text:'Alterar Usuarios',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveUsuarios.hide();
                    this.fireEvent("saveCommandUsuarios", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveUsuarios.hide();
                }
            }
        ];
        if (!this.ConfirmSaveUsuarios) {
            this.ConfirmSaveUsuarios = Ext.create('Ext.ActionSheet', {
                items:items
            });
        }
        Ext.Viewport.add(this.ConfirmSaveUsuarios);
        this.ConfirmSaveUsuarios.show();
    },
    onDeleteUsuariosTap: function() {
        var items = [
            {
                text:'Apagar Usuarios',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteUsuarios.hide();
                    this.fireEvent("deleteCommandUsuarios", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteUsuarios.hide();
                }
            }
        ];
        if (!this.ConfirmDeleteUsuarios) {
            this.ConfirmDeleteUsuarios = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteUsuarios);
        this.ConfirmDeleteUsuarios.show();
    },
    onBackUsuariosTap: function() {
        this.fireEvent("backCommandUsuarios",this);
    }
});

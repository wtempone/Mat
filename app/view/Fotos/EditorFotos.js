Ext.define(".view.Fotos.EditorFotos",{
    extend: "Ext.form.Panel",
    xtype: "EditorFotos",
    requires: ["Ext.form.FieldSet", "Ext.field.Select", "Ext.field.Toggle", "Ext.field.Number", "Ext.field.DatePicker","Ext.ActionSheet"],
    initialize: function(){
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Novo Fotos",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    iconCls: "home",
                    handler: this.onBackFotosTap,
                    scope: this
                },
                { xtype: "spacer" },
                {
                    xtype: "button",
                    ui: "confirm",
                    iconCls: "compose",
                    handler: this.onSaveFotosTap,
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
                    handler: this.onDeleteFotosTap,
                    scope: this
                }
            ]
        };
        this.add([
            toolbar,
            {
                xtype: "fieldset",
                title: "Fotos",
                defaults: {
                    xtype: "textfield"
                },
                items: [
                    {
                        xtype: "numberfield", 
                        disabled: true, 
                        name: "cd_foto", 
                        size: 4, 
                        label: "Id Foto" 
                    },
                    {
                        name: "ar_foto", 
                        size: 0, 
                        label: "Arquivo" 
                    }
                ]
            },
            toolbar2
        ]);
        this.callParent(arguments);
    },
    config: {
        listeners: {
            show: function() { this.onFotosShow(); }
        }
    },
    onFotosShow: function(){
        if (this.getRecord().phantom)
            this.items.get(0).setTitle("Novo Fotos");
        else
            this.items.get(0).setTitle("Editar Fotos");
            
    },
    onSaveFotosTap: function() {
        var items = [
            {
                text:'Alterar Fotos',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveFotos.hide();
                    this.fireEvent("saveCommandFotos", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveFotos.hide();
                }
            }
        ];
        if (!this.ConfirmSaveFotos) {
            this.ConfirmSaveFotos = Ext.create('Ext.ActionSheet', {
                items:items
            });
        }
        Ext.Viewport.add(this.ConfirmSaveFotos);
        this.ConfirmSaveFotos.show();
    },
    onDeleteFotosTap: function() {
        var items = [
            {
                text:'Apagar Fotos',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteFotos.hide();
                    this.fireEvent("deleteCommandFotos", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteFotos.hide();
                }
            }
        ];
        if (!this.ConfirmDeleteFotos) {
            this.ConfirmDeleteFotos = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteFotos);
        this.ConfirmDeleteFotos.show();
    },
    onBackFotosTap: function() {
        this.fireEvent("backCommandFotos",this);
    }
});

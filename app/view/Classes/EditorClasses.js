Ext.define("Mat.view.Classes.EditorClasses",{
    extend: "Ext.form.Panel",
    xtype: "EditorClasses",
    requires: ["Ext.form.FieldSet", "Ext.field.Select", "Ext.field.Toggle", "Ext.field.Number", "Ext.field.DatePicker","Ext.ActionSheet"],
    initialize: function(){
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Novo Classes",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    iconCls: "home",
                    handler: this.onBackClassesTap,
                    scope: this
                },
                { xtype: "spacer" },
                {
                    xtype: "button",
                    ui: "confirm",
                    iconCls: "compose",
                    handler: this.onSaveClassesTap,
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
                    handler: this.onDeleteClassesTap,
                    scope: this
                }
            ]
        };
        this.add([
            toolbar,
            {
                xtype: "fieldset",
                title: "Classes",
                defaults: {
                    xtype: "textfield"
                },
                items: [
                    {
                        xtype: "numberfield", 
                        disabled: true, 
                        name: "cd_cls", 
                        size: 4, 
                        label: "Id Classe" 
                    },
                    {
                        name: "tx_cls", 
                        size: 255, 
                        label: "Definição" 
                    }
                ]
            },
            toolbar2
        ]);
        this.callParent(arguments);
    },
    config: {
        listeners: {
            show: function() { this.onClassesShow(); }
        }
    },
    onClassesShow: function(){
        if (this.getRecord().phantom)
            this.items.get(0).setTitle("Novo Classes");
        else
            this.items.get(0).setTitle("Editar Classes");
            
    },
    onSaveClassesTap: function() {
        var items = [
            {
                text:'Alterar Classes',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveClasses.hide();
                    this.fireEvent("saveCommandClasses", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveClasses.hide();
                }
            }
        ];
        if (!this.ConfirmSaveClasses) {
            this.ConfirmSaveClasses = Ext.create('Ext.ActionSheet', {
                items:items
            });
        }
        Ext.Viewport.add(this.ConfirmSaveClasses);
        this.ConfirmSaveClasses.show();
    },
    onDeleteClassesTap: function() {
        var items = [
            {
                text:'Apagar Classes',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteClasses.hide();
                    this.fireEvent("deleteCommandClasses", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteClasses.hide();
                }
            }
        ];
        if (!this.ConfirmDeleteClasses) {
            this.ConfirmDeleteClasses = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteClasses);
        this.ConfirmDeleteClasses.show();
    },
    onBackClassesTap: function() {
        this.fireEvent("backCommandClasses",this);
    }
});

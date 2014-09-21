Ext.define("Mat.view.Fases.EditorFases",{
    extend: "Ext.form.Panel",
    xtype: "EditorFases",
    requires: ["Ext.form.FieldSet", "Ext.field.Select", "Ext.field.Toggle", "Ext.field.Number", "Ext.field.DatePicker","Ext.ActionSheet"],
    config: {
        layout: "vbox",
        scrollable: false,
        listeners: {
            show: function() { this.onFasesShow(); }
        }
    },    
    initialize: function(){
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Nova Fase",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    //iconCls: "home",
                    text: "Fases",
                    handler: this.onBackFasesTap,
                    scope: this
                },
                { xtype: "spacer" },
                {
                    xtype: "button",
                    ui: "confirm",
                    iconCls: "compose",
                    text: "Fase",
                    handler: this.onSaveFasesTap,
                    scope: this
                }
            ]
        };
        var toolbar2 = {
            xtype: "toolbar",
            docked: "bottom",
            itemId: "faseDeleteBar",
            items: [
                {
                    xtype: "button",
                    ui: "decline",
                    iconCls: "trash",
                    text: "Fase",
                    centered: true,
                    handler: this.onDeleteFasesTap,
                    scope: this
                }
            ]
        };
        this.add([
            toolbar,
            {
                xtype: "tabpanel",
                flex  : 1,
                items: [ 
                    
                    {
                        xtype: "fieldset",
                        title: "Definições da Fase",
                        defaults: {
                            xtype: "textfield"
                        },
                        items: [
                            {
                                xtype: "textfield", 
                                disabled: true, 
                                name: "cd_fase", 
                                //id: "cd_fase", 
                                //size: 4, 
                                label: "Fase:", 
                                hidden:true
                            },
                            {
                                xtype: "spinnerfield", 
                                name: "nr_fase", 
                                size: 4, 
                                label: "Número da Fase" ,
                                stepValue: 1,
                                minValue: 1,
                                maxValue: 40,
                                value: 1
                            },
                            {
                                name: "nm_fase", 
                                size: 255, 
                                label: "Nome da fase" 
                            },
                            {
                                name: "cd_cls", 
                                label: "Classe", 
                                xtype: "selectfield",
                                store: Ext.create("Mat.store.Classes",{pageSize: null}),
                                displayField: "tx_cls",
                                valueField: "cd_cls"
                            }
                        ]
                    },
                    {
                        xtype: "Niveis",
                        title: "Niveis"
                    }

                ]
            },
            toolbar2
        ]);
        //this.callParent(arguments);
    },
    onFasesShow: function(){
        if (this.getRecord().phantom) {
            this.items.get(0).setTitle("Nova Fase");
            this.down("#faseDeleteBar").hide();
        } else {
            this.items.get(0).setTitle("Fase: " + this.getRecord().get("cd_fase"));
            this.down("#faseDeleteBar").show();
        }
    },
    onSaveFasesTap: function() {
        var lblText = ""
        if (this.getRecord().phantom) {
            lblText = "Incluir";
        } else {
            lblText = "Alterar";
        }
        var items = [
            {
                text: lblText +' Fase',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveFases.hide();
                    this.ConfirmSaveFases.destroy();
                    this.fireEvent("saveCommandFases", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveFases.hide();
                    this.ConfirmSaveFases.destroy();

                }
            }
        ];
        this.ConfirmSaveFases = Ext.create('Ext.ActionSheet', {
            items:items
        });
        Ext.Viewport.add(this.ConfirmSaveFases);
        this.ConfirmSaveFases.show();
    },
    onDeleteFasesTap: function() {
        var items = [
            {
                text:'Apagar Fase',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteFases.hide();
                    this.fireEvent("deleteCommandFases", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteFases.hide();
                }
            }
        ];
        if (!this.ConfirmDeleteFases) {
            this.ConfirmDeleteFases = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteFases);
        this.ConfirmDeleteFases.show();
    },
    onBackFasesTap: function() {
        this.fireEvent("backCommandFases",this);
    }
});

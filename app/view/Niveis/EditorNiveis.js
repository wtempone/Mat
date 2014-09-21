Ext.define("Mat.view.Niveis.EditorNiveis",{
    extend: "Ext.form.Panel",
    xtype: "EditorNiveis",
    requires: ["Ext.form.FieldSet", "Ext.field.Select", "Ext.field.Toggle", "Ext.field.Number", "Ext.field.DatePicker","Ext.ActionSheet"],
    initialize: function(){
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Novo Nivel",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    //iconCls: "home",
                    text: "Niveis",
                    handler: this.onBackNiveisTap,
                    scope: this
                },
                { xtype: "spacer" },
                {
                    xtype: "button",
                    ui: "confirm",
                    iconCls: "compose",
                    text: "Nivel",
                    handler: this.onSaveNiveisTap,
                    scope: this
                }
            ]
        };
        var toolbar2 = {
            xtype: "toolbar",
            docked: "bottom",
            itemId: "deleteNiveisBar",
            items: [
                {
                    xtype: "button",
                    ui: "decline",
                    iconCls: "trash",
                    text: "Nivel",
                    centered: true,
                    handler: this.onDeleteNiveisTap,
                    scope: this
                }
            ]
        };
        this.add([
            toolbar,
            {
                xtype: "fieldset",
                title: "Niveis",
                defaults: {
                    xtype: "textfield"
                },
                items: [
                    {
                        xtype: "button", 
                        text: "Visualizar",
                        handler: this.visualisar,
                        scope: this
                    },
                    {
                        xtype: "numberfield", 
                        disabled: true, 
                        name: "cd_nivel", 
                        size: 4, 
                        label: "Nivel",
                        hidden: true
                    },/*
                    {
//                        name: "cd_fase", 
                        label: "Fase", 
                        xtype: "numberfield",
                        disabled: true, 
                        //store: Ext.create("Mat.store.Fases",{pageSize: null}),
                        //displayField: "nr_fase",
//                        valueField: "cd_fase"
                    },*/
                    {
                        xtype: "spinnerfield", 
                        name: "nr_nivel", 
                        stepValue: 1,
                        minValue: 1,
                        value: 1,
                        maxValue: 1000000,
                        size: 4, 
                        label: "Numero" 
                    },
                    {
                        name: "nm_nivel", 
                        xtype: "textareafield",
                        maxRows: 4,
                        size: 255, 
                        label: "Descrição" ,
                        placeHolder: "Descrição do nivel" 

                    },
                    {
                        xtype: "spinnerfield", 
                        name: "nr_blocos", 
                        stepValue: 1,
                        minValue: 1,
                        maxValue: 40,
                        value: 6,
                        size: 4, 
                        label: "Blocos por Linha" 
                    },
                    {
                        xtype: "sliderfield", 
                        name: "nr_gravid", 
                        size: 4, 
                        label: "Gravidade",
                        value: 0,
                        minValue: 1,
                        maxValue: 60
                    },
                    {
                        xtype: "sliderfield", 
                        name: "nr_tempo_ger", 
                        size: 4, 
                        label: "T. Geração",
                        //value: 0.1,
                        //stepValue: 0.1,
                        minValue: 1,
                        maxValue: 500,
                    },
                    {
                        xtype: "sliderfield", 
                        name: "nr_tempo", 
                        size: 4, 
                        value: 50,
                        minValue: 0,
                        maxValue: 100,
                        label: "Tempo Limite" 
                    },
                    {
                        xtype: "spinnerfield", 
                        name: "nr_pontos", 
                        size: 4, 
                        stepValue: 1,
                        value: 30,
                        minValue: 1,
                        maxValue: 100000000,
                        label: "Pontos Alvo" 
                    },
                    {
                        xtype: "togglefield", 
                        name: "in_random", 
                        size: 2, 
                        label: "Geração Randomica" 
                    },
                    {
                        name: "tx_excluir", 
                        xtype: "textareafield",
                        maxRows: 4,
                        size: 14, 
                        label: "Excluir:" ,
                        placeHolder: "Excluir" 

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
            toolbar2
        ]);
        this.callParent(arguments);
    },
    config: {
        listeners: {
            show: function() { this.onNiveisShow(); }
        }
    },
    visualisar: function(){ 
        //console.log(this.getRecord());
        //console.log(this.getRecord().get("nr_nivel"));
        //this.fireEvent("saveCommandNiveis", this);

        if (this.getValues()) {
            var rec = this.getValues();
            console.log("Passagem do parametro tempo_ger:"+rec.nr_tempo_ger);
            Ext.Viewport.add(Ext.create("Mat.view.EngineJogo",
            {
                left: (window.innerWidth * 0.0)/2,
                top: 0, //(window.innerHeight * 0.2),
                width: window.innerWidth * 1,
                height: window.innerHeight - (window.innerHeight * 0.10),
                nr_nivel: rec.nr_nivel,
                nm_nivel: rec.nm_nivel,
                nr_blocos: rec.nr_blocos,
                nr_gravid: rec.nr_gravid,
                nr_tempo_ger: rec.nr_tempo_ger,
                nr_tempo: rec.nr_tempo,
                nr_pontos: rec.nr_pontos,
                in_random: rec.in_random,
                tx_excluir: rec.tx_excluir,
                demo: true
            })).show();
        }
        //this.items.get(0).setTitle("Nivel: "+ this.getRecord().get("nr_nivel"));
    },
    onNiveisShow: function(){
        if (this.getRecord().phantom) {
            this.items.get(0).setTitle("Novo Nivel");
            this.down("#deleteNiveisBar").hide();
        } else {
            this.items.get(0).setTitle("Nivel: "+ this.getRecord().get("nr_nivel"));
            this.down("#deleteNiveisBar").show();
        }
    },
    onSaveNiveisTap: function() {
        var lblText = ""
        if (this.getRecord().phantom) {
            lblText = "Incluir";
        } else {
            lblText = "Alterar";
        }

        var items = [
            {
                text: lblText +' Nivel',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveNiveis.hide();
                    this.ConfirmSaveNiveis.destroy();
                    this.fireEvent("saveCommandNiveis", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveNiveis.hide();
                }
            }
        ];
        this.ConfirmSaveNiveis = Ext.create('Ext.ActionSheet', {
            items:items
        });
        Ext.Viewport.add(this.ConfirmSaveNiveis);
        this.ConfirmSaveNiveis.show();
    },
    onDeleteNiveisTap: function() {
        var items = [
            {
                text:'Apagar Nivel',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteNiveis.hide();
                    this.fireEvent("deleteCommandNiveis", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteNiveis.hide();
                    this.fireEvent("deleteCommandNiveis", this);
                }
            }
        ];
        if (!this.ConfirmDeleteNiveis) {
            this.ConfirmDeleteNiveis = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteNiveis);
        this.ConfirmDeleteNiveis.show();
    },
    onBackNiveisTap: function() {
        this.fireEvent("backCommandNiveis",this);
    }
});

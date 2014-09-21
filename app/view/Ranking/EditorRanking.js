Ext.define("Mat.view.Ranking.EditorRanking",{
    extend: "Ext.form.Panel",
    xtype: "EditorRanking",
    requires: ["Ext.form.FieldSet", "Ext.field.Select", "Ext.field.Toggle", "Ext.field.Number", "Ext.field.DatePicker","Ext.ActionSheet"],
    initialize: function(){
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Novo Ranking",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    iconCls: "home",
                    handler: this.onBackRankingTap,
                    scope: this
                },
                { xtype: "spacer" },
                {
                    xtype: "button",
                    ui: "confirm",
                    iconCls: "compose",
                    handler: this.onSaveRankingTap,
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
                    handler: this.onDeleteRankingTap,
                    scope: this
                }
            ]
        };
        this.add([
            toolbar,
            {
                xtype: "fieldset",
                title: "Ranking",
                defaults: {
                    xtype: "textfield"
                },
                items: [
                    {
                        xtype: "numberfield", 
                        disabled: true, 
                        name: "cd_rank", 
                        size: 4, 
                        label: "Primarykey" 
                    },
                    {
                        name: "cd_usuar", 
                        label: "Código Usuário", 
                        xtype: "selectfield",
                        store: Ext.create("Mat.store.Usuarios",{pageSize: null}),
                        displayField: "nm_usuar",
                        valueField: "cd_usuar"
                    },
                    {
                        name: "cd_fase", 
                        label: "Código da Fase", 
                        xtype: "selectfield",
                        store: Ext.create("Mat.store.Fases",{pageSize: null}),
                        displayField: "nr_fase",
                        valueField: "cd_fase"
                    },
                    {
                        name: "cd_nivel", 
                        label: "Código do Nivel", 
                        xtype: "selectfield",
                        store: Ext.create("Mat.store.Niveis",{pageSize: null}),
                        displayField: "nm_nivel",
                        valueField: "cd_nivel"
                    },
                    {
                        xtype: "numberfield", 
                        name: "nr_pontos", 
                        size: 4, 
                        label: "Pontos" 
                    },
                    {
                        xtype: "numberfield", 
                        name: "nr_tempo", 
                        size: 4, 
                        label: "Tempo" 
                    }
                ]
            },
            toolbar2
        ]);
        this.callParent(arguments);
    },
    config: {
        listeners: {
            show: function() { this.onRankingShow(); }
        }
    },
    onRankingShow: function(){
        if (this.getRecord().phantom)
            this.items.get(0).setTitle("Novo Ranking");
        else
            this.items.get(0).setTitle("Editar Ranking");
            
    },
    onSaveRankingTap: function() {
        var items = [
            {
                text:'Alterar Ranking',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveRanking.hide();
                    this.fireEvent("saveCommandRanking", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveRanking.hide();
                }
            }
        ];
        if (!this.ConfirmSaveRanking) {
            this.ConfirmSaveRanking = Ext.create('Ext.ActionSheet', {
                items:items
            });
        }
        Ext.Viewport.add(this.ConfirmSaveRanking);
        this.ConfirmSaveRanking.show();
    },
    onDeleteRankingTap: function() {
        var items = [
            {
                text:'Apagar Ranking',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteRanking.hide();
                    this.fireEvent("deleteCommandRanking", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteRanking.hide();
                }
            }
        ];
        if (!this.ConfirmDeleteRanking) {
            this.ConfirmDeleteRanking = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteRanking);
        this.ConfirmDeleteRanking.show();
    },
    onBackRankingTap: function() {
        this.fireEvent("backCommandRanking",this);
    }
});

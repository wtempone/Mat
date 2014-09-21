Ext.define("Mat.view.Jogo.EditorJogo",{
    extend: "Ext.form.Panel",
    xtype: "EditorJogo",
    requires: ["Ext.form.FieldSet",
     "Ext.field.Select", 
     "Ext.field.Toggle", 
     "Ext.field.Number", 
     "Ext.field.DatePicker",
     "Ext.ActionSheet"
     ],
    initialize: function(){
        var store = Ext.getStore("Jogo");
        var vAux = this;
        store.load({
            callback: function(records, operation, success) {
                if (success == true) {
                    // verifica se existe algum registro cadastrado
                    console.log(store.getCount());
                    if (store.getCount() == 0) {
                        // cria novo registro
                        var newJogo = Ext.create("Mat.model.Jogo");
                        vAux.setRecord(newJogo);
                        console.log(newJogo);
                    } else {
                        // edita registro existente
                        vAux.setRecord(store.getAt(0));
                        vAux.getRecord().phantom = false;
                    }
                }   
            }
        });

        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Configurações do Jogo"
        };
        this.add([
            toolbar,
            {
                xtype: "fieldset",
                title: "Jogo",
                defaults: {
                    xtype: "textfield"
                },
                items: [
                    {
                        xtype: "spinnerfield", 
                        //disabled: true, 
                        stepValue: 1,
                        name: "versao", 
                        size: 4, 
                        label: "Versao:" 
                    },
                    {
                        name: "nome", 
                        size: 255, 
                        label: "Nome" 
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
                xtype: "button",
                ui: "confirm",
                //iconCls: "compose",
                text: "Publicar",
                handler: this.onSaveJogoTap,
                scope: this
            },
            {
                xtype: "button",
                //ui: "confirm",
                //iconCls: "compose",
                text: "Editar Fases",
                handler: this.onEditarFasesTap,
                scope: this
            }

        ]);
        this.callParent(arguments);
    },
/*    config: {
        listeners: {
            show: function() { this.onJogoShow(); }
        }
    },
    onJogoShow: function(){
        if (this.getRecord().phantom)
            this.items.get(0).setTitle("Novo Jogo");
        else
            this.items.get(0).setTitle("Editar Jogo");
            
    },*/
    onEditarFasesTap: function() {
        console.log('chama edita fases');
        this.fireEvent("editarFasesCommandJogo", this);
    },
    onSaveJogoTap: function() {
        var items = [
            {
                text:'Publicar',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveJogo.hide();
                    this.fireEvent("saveCommandJogo", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveJogo.hide();
                }
            }
        ];
        if (!this.ConfirmSaveJogo) {
            this.ConfirmSaveJogo = Ext.create('Ext.ActionSheet', {
                items:items
            });
        }
        Ext.Viewport.add(this.ConfirmSaveJogo);
        this.ConfirmSaveJogo.show();
    },
    onDeleteJogoTap: function() {
        var items = [
            {
                text:'Apagar Jogo',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteJogo.hide();
                    this.fireEvent("deleteCommandJogo", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteJogo.hide();
                }
            }
        ];
        if (!this.ConfirmDeleteJogo) {
            this.ConfirmDeleteJogo = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteJogo);
        this.ConfirmDeleteJogo.show();
    },
    onBackJogoTap: function() {
        this.fireEvent("backCommandJogo",this);
    }
});

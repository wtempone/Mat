Ext.define(".view.Audios.EditorAudios",{
    extend: "Ext.form.Panel",
    xtype: "EditorAudios",
    requires: ["Ext.form.FieldSet", "Ext.field.Select", "Ext.field.Toggle", "Ext.field.Number", "Ext.field.DatePicker","Ext.ActionSheet"],
    initialize: function(){
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Novo Audios",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    iconCls: "home",
                    handler: this.onBackAudiosTap,
                    scope: this
                },
                { xtype: "spacer" },
                {
                    xtype: "button",
                    ui: "confirm",
                    iconCls: "compose",
                    handler: this.onSaveAudiosTap,
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
                    handler: this.onDeleteAudiosTap,
                    scope: this
                }
            ]
        };
        this.add([
            toolbar,
            {
                xtype: "fieldset",
                title: "Audios",
                defaults: {
                    xtype: "textfield"
                },
                items: [
                    {
                        xtype: "numberfield", 
                        disabled: true, 
                        name: "cd_audio", 
                        size: 4, 
                        label: "Id Audio" 
                    },
                    {
                        name: "ar_audio", 
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
            show: function() { this.onAudiosShow(); }
        }
    },
    onAudiosShow: function(){
        if (this.getRecord().phantom)
            this.items.get(0).setTitle("Novo Audios");
        else
            this.items.get(0).setTitle("Editar Audios");
            
    },
    onSaveAudiosTap: function() {
        var items = [
            {
                text:'Alterar Audios',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveAudios.hide();
                    this.fireEvent("saveCommandAudios", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveAudios.hide();
                }
            }
        ];
        if (!this.ConfirmSaveAudios) {
            this.ConfirmSaveAudios = Ext.create('Ext.ActionSheet', {
                items:items
            });
        }
        Ext.Viewport.add(this.ConfirmSaveAudios);
        this.ConfirmSaveAudios.show();
    },
    onDeleteAudiosTap: function() {
        var items = [
            {
                text:'Apagar Audios',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteAudios.hide();
                    this.fireEvent("deleteCommandAudios", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteAudios.hide();
                }
            }
        ];
        if (!this.ConfirmDeleteAudios) {
            this.ConfirmDeleteAudios = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteAudios);
        this.ConfirmDeleteAudios.show();
    },
    onBackAudiosTap: function() {
        this.fireEvent("backCommandAudios",this);
    }
});

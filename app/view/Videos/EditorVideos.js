Ext.define(".view.Videos.EditorVideos",{
    extend: "Ext.form.Panel",
    xtype: "EditorVideos",
    requires: ["Ext.form.FieldSet", "Ext.field.Select", "Ext.field.Toggle", "Ext.field.Number", "Ext.field.DatePicker","Ext.ActionSheet"],
    initialize: function(){
        var toolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Novo Videos",
            items: [
                {
                    xtype: "button",
                    ui: "back",
                    iconCls: "home",
                    handler: this.onBackVideosTap,
                    scope: this
                },
                { xtype: "spacer" },
                {
                    xtype: "button",
                    ui: "confirm",
                    iconCls: "compose",
                    handler: this.onSaveVideosTap,
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
                    handler: this.onDeleteVideosTap,
                    scope: this
                }
            ]
        };
        this.add([
            toolbar,
            {
                xtype: "fieldset",
                title: "Videos",
                defaults: {
                    xtype: "textfield"
                },
                items: [
                    {
                        xtype: "numberfield", 
                        disabled: true, 
                        name: "cd_video", 
                        size: 4, 
                        label: "Id Video" 
                    },
                    {
                        name: "ar_video", 
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
            show: function() { this.onVideosShow(); }
        }
    },
    onVideosShow: function(){
        if (this.getRecord().phantom)
            this.items.get(0).setTitle("Novo Videos");
        else
            this.items.get(0).setTitle("Editar Videos");
            
    },
    onSaveVideosTap: function() {
        var items = [
            {
                text:'Alterar Videos',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmSaveVideos.hide();
                    this.fireEvent("saveCommandVideos", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmSaveVideos.hide();
                }
            }
        ];
        if (!this.ConfirmSaveVideos) {
            this.ConfirmSaveVideos = Ext.create('Ext.ActionSheet', {
                items:items
            });
        }
        Ext.Viewport.add(this.ConfirmSaveVideos);
        this.ConfirmSaveVideos.show();
    },
    onDeleteVideosTap: function() {
        var items = [
            {
                text:'Apagar Videos',
                ui:'confirm',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteVideos.hide();
                    this.fireEvent("deleteCommandVideos", this);
                }
            },
            {
                xtype:'button',
                text:'Cancelar',
                ui:'decline',
                scope: this,
                handler: function() {
                    this.ConfirmDeleteVideos.hide();
                }
            }
        ];
        if (!this.ConfirmDeleteVideos) {
            this.ConfirmDeleteVideos = Ext.create('Ext.ActionSheet', {
               items:items
            });
        }

        Ext.Viewport.add(this.ConfirmDeleteVideos);
        this.ConfirmDeleteVideos.show();
    },
    onBackVideosTap: function() {
        this.fireEvent("backCommandVideos",this);
    }
});

Ext.define("Mat.view.Main", {
    extend: 'Ext.ux.slidenavigation.View',
    xtype: 'Main',
    id: 'Main',   
    requires: [
        'Ext.Container',
        'Ext.MessageBox',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.event.publisher.Dom'
    ],
    config: {
        fullscreen: true,        
        slideSelector: 'x-toolbar',
        containerSlideDelay: 10,       
        selectSlideDuration: 200,
        itemMask: false,
        title: 'Teste',
        slideButtonDefaults: {
            selector: 'toolbar',
            docked: 'left'
        },        
        list: {
            maxDrag: 250,
            width: 200,
            items: [
            ]
            
        },
        
        groups: {
            'Cadastro': 1
        },
        items: [
            {
                title: 'Classes',
                group: 'Cadastro',
                slideButton: true,
                items: [
                    {
                        xtype: 'Classes'
                    }
                ]
            },
            {
                title: 'Fases',
                group: 'Cadastro',
                slideButton: true,
                items: [
                    {
                        xtype: 'Fases'
                    }
                ]
            },
            {
                title: 'Jogo',
                group: 'Cadastro',
                slideButton: true,
                items: [
                    {
                        xtype: 'Jogo'
                    }
                ]
            },
            {
                title: 'Niveis',
                group: 'Cadastro',
                slideButton: true,
                items: [
                    {
                        xtype: 'Niveis'
                    }
                ]
            },
            {
                title: 'Ranking',
                group: 'Cadastro',
                slideButton: true,
                items: [
                    {
                        xtype: 'Ranking'
                    }
                ]
            },
            {
                title: 'Usuarios',
                group: 'Cadastro',
                slideButton: true,
                items: [
                    {
                        xtype: 'Usuarios'
                    }
                ]
            }
        ]
    }
});
